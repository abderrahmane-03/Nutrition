<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'client_id',
        'coache_id',
        'rating'
    ];
    use HasFactory;
    public function recipe(){
        return $this->belongsTo(Recipe::class);
    }
    public function reservation(){
        return $this->belongsTo(Reservation::class);
    }
}
