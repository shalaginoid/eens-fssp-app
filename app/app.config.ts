export default defineAppConfig({
  ui: {
    tabs: {
      variants: {
        variant: {
          pill: {
            list: 'bg-neutral-200/60',
          },
        },
      },
    },
    alert: {
      defaultVariants: {
        variant: 'subtle',
      },
    },
    fileUpload: {
      variants: {
        variant: {
          area: {
            wrapper: 'px-0 py-0',
            base: 'p-4',
          },
        },
      },
    },
  },
});
