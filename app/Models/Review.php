<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    public function recipe(){
        return $this->belongsTo(Recipe::class);
    }
    public function reservation(){
        return $this->belongsTo(Reservation::class);
    }
}
