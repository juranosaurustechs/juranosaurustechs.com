import {createSignal, createEffect} from 'solid-js';
import '../styles/switch.css';

const initializeTheme = () => {
  let theme;
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme') as 'light' | 'dark';
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark';
  } else {
    theme = 'light';
  }
  return theme;
};

const ThemeSwitch = () => {
  const [theme, setTheme] = createSignal<string>(initializeTheme());

  createEffect(() => {
    const root = document.documentElement;
    if (theme() === 'light') {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  return (
    <div>
      <input
        type="button"
        class="switch"
        onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        title={`Toggle to ${theme() === 'light' ? 'dark' : 'light'} mode`}
        value={`Toggle to ${theme() === 'light' ? 'dark' : 'light'} mode`}
      />
    </div>
  );
};

export default ThemeSwitch;
