<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Message;
use App\Events\ChatSent;
use App\Models\Coach;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class chatController extends Controller
{

    public function chatForm($userId)
    {
        $sender = Auth::guard('api')->user()->id;
        $receiver = User::where('id', $userId)->first();
        $messages1 = Message::where('sender', $sender)
            ->where('receiver', $userId)
            ->get();

        $messages2 = Message::where('sender', $userId)
            ->where('receiver', $sender)
            ->get();

        $allMessages = $messages1->merge($messages2)->sortBy('created_at'); // Sort messages by created_at

        return response()->json([
            'status' => 'success',
            'messages' => $allMessages,
            'receiver' => $receiver, // Include receiver ID in the response
        ], 200);
    }



    public function sendMessage($user_id, Request $request){

        $data = $request->validate([
            'message' => 'required',
        ]);

        $data['sender'] = Auth::guard('api')->user()->id;
        $data['receiver'] = $user_id;

        $message = Message::create($data);

        $receiver = User::findOrFail($user_id);
        broadcast(new ChatSent($receiver, $message));

        return response()->json([
            'status' => 'success',
            'message' => $message,
        ], 200);
    }
    public function bringclients(){
        $coach_id=Auth::guard('api')->user()->coach->id;
        $reservations = Reservation::where('coach_id',$coach_id)->with('client.user')->get();

        return response()->json([
            'status' => 'success',
            'reservations' => $reservations,
        ], 200);
    }
    public function auth(){
        $coach_id = Auth::guard('api')->user()->coach->id;
        $coach = Coach::where('id', $coach_id)->with('user')->first(); // or ->get() if you expect multiple coaches with the same ID
        return response()->json([
            'status' => 'success',
            'coach' => $coach,
        ], 200);
    }

    public function bringMessage($receiver) {
        $sender = Auth::guard('api')->user()->id;

        $messages = Message::where('receiver', $receiver)
                            ->where('sender', $sender)
                            ->get();

        return response()->json([
            'status' => 'success',
            'message' => $messages,
        ], 200);
    }

}

