DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    profile_picture_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    users (
        first_name,
        country,
        email,
        profile_picture_url
    )
VALUES
    (
        'Palmeiras',
        'Brazil',
        'palmeiras@reqres.in',
        'https://w7.pngwing.com/pngs/55/510/png-transparent-sociedade-esportiva-palmeiras-campeonato-brasileiro-serie-a-sport-club-corinthians-paulista-copa-do-brasil-sub-17-football-sport-logo-sports-thumbnail.png'
    ),
    (
        'Milan',
        'Italy',
        'milan@reqres.in',
        'https://w7.pngwing.com/pngs/927/303/png-transparent-acm-1899-logo-a-c-milan-uefa-champions-league-serie-a-uefa-europa-league-inter-milan-1000-sport-trademark-logo-thumbnail.png'
    ),
    (
        'Bayern Munchen',
        'Germany',
        'bayernmunchen@reqres.in',
        'https://w7.pngwing.com/pngs/442/47/png-transparent-allianz-arena-fc-bayern-munich-bundesliga-tsv-1860-munich-der-klassiker-bundesliga-emblem-trademark-sport-thumbnail.png'
    ),
    (
        'Real Madrid',
        'Spain',
        'emma.wong@reqres.in',
        'https://w7.pngwing.com/pngs/552/638/png-transparent-real-madrid-c-f-la-liga-logo-real-madrid-logo-crown-logo-miscellaneous-sport-team-thumbnail.png'
    ),
    (
        'PSG',
        'France',
        'psg@reqres.in',
        'https://w7.pngwing.com/pngs/506/731/png-transparent-paris-saint-germain-f-c-paris-saint-germain-academy-paris-fc-uefa-champions-league-france-ligue-1-fc-barcelona-blue-trademark-sport-thumbnail.png'
    ),
    (
        'Manchester City',
        'England',
        'city@reqres.in',
        'https://w7.pngwing.com/pngs/71/951/png-transparent-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-area-thumbnail.png'
    );