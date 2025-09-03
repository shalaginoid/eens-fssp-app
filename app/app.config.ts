export default defineAppConfig({
  ui: {
    card: {
      variants: {
        variant: {
          soft: {
            root: 'bg-white',
          },
        },
      },
      defaultVariants: {
        variant: 'soft',
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
    input: {
      defaultVariants: {
        size: 'lg',
      },
    },
    select: {
      defaultVariants: {
        size: 'lg',
      },
    },
    checkbox: {
      defaultVariants: {
        size: 'lg',
      },
    },
    button: {
      defaultVariants: {
        size: 'lg',
      },
    },
  },
});
