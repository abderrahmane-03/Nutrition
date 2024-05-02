<?php
namespace App\Events;

use App\Models\User;
use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ChatSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public User $receiver;
    public Message $message;

    /**
     * Create a new event instance.
     */
    public function __construct(User $receiver, Message $message)
    {
        $this->receiver = $receiver;
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('chattest');
    }
    public function broadcastWith(): array
    {
        return [
            'content' => $this->message,
            'on' => now()->toDateTimeString()
        ];
    }

    public function broadcastAs()
    {
        return 'chatMessage';
    }
}
