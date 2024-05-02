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

    public function chatForm($user_id){

        $receiver = User::findOrFail($user_id);
        broadcast(new ChatSent($receiver, '2'));
        return response()->json([
            'status' => 'success',
            'receiver' => $receiver,

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



}

