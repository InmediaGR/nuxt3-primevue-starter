export function useNavigationMenu() {
  const separator = h('hr')

  const menu = computed(() => {
    return [
      {
        href: '/',
        title: 'Home',
        icon: 'pi pi-fw pi-home',
      },
      {
        component: markRaw(separator),
      },
      {
        title: 'UI',
        icon: 'pi pi-image',
        child: [
          { href: '/ui/uno', title: 'UnoCSS' },
          { href: '/ui/icons', title: 'Icons' },
          { href: '/ui/tiptap', title: 'TipTap' },
        ],
      },
    ]
  })

  return { menu }
}
