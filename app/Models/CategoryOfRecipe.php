<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryOfRecipe extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'category_of_recipe';

    // Disable timestamps for the pivot table
    public $timestamps = false;

    // Define the fillable fields if needed
    protected $fillable = ['recipe_id', 'category_id'];

    // Define any additional methods or relationships here if needed
}
