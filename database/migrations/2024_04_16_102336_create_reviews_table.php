<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId("reservation_id")->constrained('reservations')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId("recipe_id")->constrained('recipes')->cascadeOnDelete()->cascadeOnUpdate();
            $table->integer("rating");
            $table->string("picture1");
            $table->string("picture2");
            $table->string("text");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
