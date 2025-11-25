export default defineAppConfig({
  ui: {
    // colors: {
    //   neutral: 'zinc',
    // },
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
    // card: {
    //   variants: {
    //     variant: {
    //       soft: {
    //         root: 'bg-white',
    //       },
    //     },
    //   },
    //   defaultVariants: {
    //     variant: 'subtle',
    //   },
    // },
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
    selectMenu: {
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
