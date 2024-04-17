<?php

it('Ajoute des annonce', function () {
    $announcementData = [
        'title' => 'Annonce 1',
        'description' => 'description',
        'location'=>'localisation',
        'date'=>'2024-04-08 19:44:54',
        'required_skills'=>'comps',
    ];

    $announcement = new App\Models\Annoucement($announcementData);

    expect($announcement->title)->toBe('Annonce 1');
    expect($announcement->description)->toBe('description');
    expect($announcement->location)->toBe('localisation');
    expect($announcement->date)->toBe('2024-04-08 19:44:54');
    expect($announcement->required_skills)->toBe('comps');
});
