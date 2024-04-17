<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description' ,'cooking_time' ,'ingrediants' , 'instructions', 'nutrition_information'];
    public function writer()
    {
        return $this->belongsTo(Writer::class);
    }
    public function review()
    {
        return $this->hasMany(Review::class);
    }

}
