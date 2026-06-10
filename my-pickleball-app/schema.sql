-- ==========================================
-- KITCHEN CLASSIC TOURNAMENT POSTGRES SCHEMA
-- ==========================================

-- 1. Create Teams Table
-- Tracks participant names, avatars, and pool groups
CREATE TABLE IF NOT EXISTS teams (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(10) NOT NULL DEFAULT '🏓',
    pool VARCHAR(10) NOT NULL DEFAULT 'Unassigned'
);

-- 2. Create Matches Table
-- Tracks matchups, game scores, status, and seeding targets.
-- Stores best-of-3 game scores dynamically using Postgres' powerful JSONB type.
CREATE TABLE IF NOT EXISTS matches (
    id VARCHAR(50) PRIMARY KEY,
    stage VARCHAR(50) NOT NULL,
    pool VARCHAR(10),
    player1_id VARCHAR(50) REFERENCES teams(id) ON DELETE SET NULL,
    player2_id VARCHAR(50) REFERENCES teams(id) ON DELETE SET NULL,
    winner_id VARCHAR(50) REFERENCES teams(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed')),
    court VARCHAR(100),
    time VARCHAR(50),
    label VARCHAR(100),
    games JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- ==========================================
-- INITIAL DATA SEEDING
-- ==========================================

INSERT INTO teams (id, name, icon, pool) VALUES
('p1', 'Ben Johns', '🦖', 'A'),
('p2', 'Anna Leigh Waters', '⚡', 'A'),
('p3', 'Tyson McGuffin', '🤠', 'A'),
('p4', 'Catherine Parenteau', '🎾', 'A'),
('p5', 'Riley Newman', '🚀', 'B'),
('p6', 'Callie Smith', '💫', 'B'),
('p7', 'JW Johnson', '🎯', 'B'),
('p8', 'Lea Jansen', '🔥', 'B')
ON CONFLICT (id) DO NOTHING;

INSERT INTO matches (id, stage, pool, player1_id, player2_id, winner_id, status, court, time, games) VALUES
-- Pool A Round-Robin
('rr_a1', 'rr', 'A', 'p1', 'p2', NULL, 'scheduled', 'Court A', '09:00 AM', '[]'::jsonb),
('rr_a2', 'rr', 'A', 'p3', 'p4', NULL, 'scheduled', 'Court B', '09:00 AM', '[]'::jsonb),
('rr_a3', 'rr', 'A', 'p1', 'p3', NULL, 'scheduled', 'Court A', '10:00 AM', '[]'::jsonb),
('rr_a4', 'rr', 'A', 'p2', 'p4', NULL, 'scheduled', 'Court B', '10:00 AM', '[]'::jsonb),
('rr_a5', 'rr', 'A', 'p1', 'p4', NULL, 'scheduled', 'Court A', '11:00 AM', '[]'::jsonb),
('rr_a6', 'rr', 'A', 'p2', 'p3', NULL, 'scheduled', 'Court B', '11:00 AM', '[]'::jsonb),

-- Pool B Round-Robin
('rr_b1', 'rr', 'B', 'p5', 'p6', NULL, 'scheduled', 'Court C', '09:00 AM', '[]'::jsonb),
('rr_b2', 'rr', 'B', 'p7', 'p8', NULL, 'scheduled', 'Court D', '09:00 AM', '[]'::jsonb),
('rr_b3', 'rr', 'B', 'p5', 'p7', NULL, 'scheduled', 'Court C', '10:00 AM', '[]'::jsonb),
('rr_b4', 'rr', 'B', 'p6', 'p8', NULL, 'scheduled', 'Court D', '10:00 AM', '[]'::jsonb),
('rr_b5', 'rr', 'B', 'p5', 'p8', NULL, 'scheduled', 'Court C', '11:00 AM', '[]'::jsonb),
('rr_b6', 'rr', 'B', 'p6', 'p7', NULL, 'scheduled', 'Court D', '11:00 AM', '[]'::jsonb),

-- Playoff Semifinals (Seed slots initialized as NULL)
('b_sf1', 'bracket', NULL, NULL, NULL, NULL, 'scheduled', 'Championship Court', '02:00 PM', '[]'::jsonb),
('b_sf2', 'bracket', NULL, NULL, NULL, NULL, 'scheduled', 'Grandstand Court', '03:15 PM', '[]'::jsonb),

-- Playoff Finals
('b_f', 'bracket', NULL, NULL, NULL, NULL, 'scheduled', 'Championship Court', '05:00 PM', '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;