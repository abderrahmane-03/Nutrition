<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id'
    ];


    public function Coach()
    {
        return $this->hasMany(Coach::class);
    }
    public function recipes()
    {
        return $this->hasMany(Recipe::class);
    }
    public function clients()
    {
        return $this->belongsTo(Client::class);
    }


}
