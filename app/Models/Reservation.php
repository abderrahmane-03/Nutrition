<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $guarded =  [];
    public function coach(){
        return $this->belongsTo(Coach::class);
    }
    public function client(){
        return $this->belongsTo(Client::class);
    }
    public function review(){
        return $this->hasone(Review::class);
    }
}
