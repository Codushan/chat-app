// TestDaisy.jsx
import React, { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore'; // Assuming this path is correct

const TestDaisy = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold text-primary">DaisyUI Theme Test</h1>
      <button className="btn btn-primary">Primary Button</button>
      <button className="btn btn-secondary">Secondary Button</button>
      <button className="btn btn-accent">Accent Button</button>
      <button className="btn btn-info">Info Button</button>
      <button className="btn btn-success">Success Button</button>
      <button className="btn btn-warning">Warning Button</button>
      <button className="btn btn-error">Error Button</button>

      <div className="form-control w-full max-w-xs mt-8">
        <label className="label">
          <span className="label-text">Select Theme:</span>
        </label>
        <select
          className="select select-bordered"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          {['light', 'dark', 'cupcake', 'synthwave', 'forest', 'dracula'].map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TestDaisy;