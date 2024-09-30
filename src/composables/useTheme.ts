import { ref } from 'vue';

export function useTheme() {
    const isDarkMode = ref(false);

    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value;
        if (isDarkMode.value) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    };

    return {
        isDarkMode,
        toggleTheme,
    };
}
