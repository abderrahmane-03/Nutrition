<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagOfRecipe extends Model
{
    use HasFactory;

    // Disable timestamps for the pivot table
    public $timestamps = false;

    // Define the fillable fields if needed
    protected $fillable = ['recipe_id', 'tag_id'];

    // Define any additional methods or relationships here if needed
}
