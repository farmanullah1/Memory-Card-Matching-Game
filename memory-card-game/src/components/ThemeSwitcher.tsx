import type { SkinMode } from '../../types';

interface ThemeSwitcherProps {
  currentSkin: SkinMode;
  isDark: boolean;
  onSkinChange: (skin: SkinMode) => void;
  onThemeToggle: () => void;
  isMuted: boolean;
  onMuteToggle: () => void;
}

const ThemeSwitcher = ({ 
  currentSkin, 
  isDark, 
  onSkinChange, 
  onThemeToggle,
  isMuted,
  onMuteToggle 
}: ThemeSwitcherProps) => {
  const skins: { value: SkinMode; emoji: string; label: string }[] = [
    { value: 'default', emoji: '🎨', label: 'Default' },
    { value: 'ocean', emoji: '🌊', label: 'Ocean' },
    { value: 'sunset', emoji: '🌅', label: 'Sunset' },
    { value: 'neon', emoji: '✨', label: 'Neon' },
  ];

  return (
    <div className="theme-switcher">
      <button
        className="theme-btn"
        onClick={onThemeToggle}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>
      
      <button
        className="theme-btn"
        onClick={onMuteToggle}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {skins.map((skin) => (
        <button
          key={skin.value}
          className={`theme-btn ${currentSkin === skin.value ? 'active' : ''}`}
          onClick={() => onSkinChange(skin.value)}
          title={skin.label}
        >
          {skin.emoji}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
