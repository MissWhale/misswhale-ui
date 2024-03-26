import { nextTick, onMounted, ref } from "vue";
export type Theme = string | null;
export const useTheme = () => {
  const theme = ref<Theme>(
    typeof localStorage !== "undefined"
      ? localStorage?.getItem("misswhale-theme") || null
      : null
  );
  const classList = ref<DOMTokenList>(
    typeof document !== "undefined"
      ? document.documentElement.classList
      : ([] as unknown as DOMTokenList)
  );

  onMounted(() => {
    autoTheme();
  });

  const autoTheme = (): void => {
    nextTick(() => {
      if (theme.value === null) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      } else setTheme(theme.value);
    });
  };

  const setTheme = (setToTheme: string): void => {
    classList.value.remove(
      ...["light", "dark"].filter((t) => t !== setToTheme)
    );
    classList.value.add(setToTheme);
    localStorage.setItem("misswhale-theme", setToTheme);
    theme.value = setToTheme;
  };

  const toggleTheme = (): void => {
    setTheme(theme.value === "light" ? "dark" : "light");
  };
  return {
    theme,
    toggleTheme,
    autoTheme,
  };
};
