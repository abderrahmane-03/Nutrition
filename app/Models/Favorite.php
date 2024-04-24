<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [

        'client_id',
        'coache_id',
        'recipe_id'
    ];


    public function coach()
    {
        return $this->belongsTo(Coach::class);
    }
    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
    public function clients()
    {
        return $this->belongsTo(Client::class);
    }


}
