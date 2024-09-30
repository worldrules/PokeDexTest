import { ref, onMounted } from 'vue';

export function useTheme() {
    const isDarkMode = ref(false);

    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value;
        if (isDarkMode.value) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    onMounted(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            isDarkMode.value = true;
            document.body.classList.add('dark');
        }
    });

    return {
        isDarkMode,
        toggleTheme,
    };
}
