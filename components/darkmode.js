import { useTheme } from 'next-themes'

export default function DarkMode() {
    const { theme, setTheme } = useTheme()

    return (
        <div>

            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>dark</button>

        </div>
    )
}