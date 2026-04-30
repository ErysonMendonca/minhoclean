-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id BIGINT PRIMARY KEY DEFAULT 1,
  whatsapp TEXT DEFAULT '351912345678',
  footer_text TEXT DEFAULT 'MinhoClean - Serviços Profissionais de Limpeza.',
  footer_address TEXT DEFAULT 'Braga, Portugal',
  footer_email TEXT DEFAULT 'geral@minhoclean.pt',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (id, whatsapp, footer_text, footer_address, footer_email)
VALUES (1, '351912345678', 'MinhoClean - Serviços Profissionais de Limpeza.', 'Braga, Portugal', 'geral@minhoclean.pt')
ON CONFLICT (id) DO NOTHING;
