export interface Category {
  id: string
  icon: string
  title: string
  description: string
  image: string
}

export interface Product {
  id: string
  title: string
  description: string
  image: string
  fullDescription: string
  specifications: any[]
  application: string
}

export const categories: Category[] = [
  {
    id: 'building_frames',
    icon: '🏗️',
    title: 'Каркасы зданий',
    description: 'Фермы, каркасы ангаров, марши, опоры и перекрытия',
    image: '/img/catalog/karkas.jpeg'
  },
  {
    id: 'columns_beams',
    icon: '🏢',
    title: 'Колонны и балки',
    description: 'Колонны стальные, двутавр, швеллер, уголок',
    image: '/img/catalog/balki.png'
  },
  {
    id: 'pipes',
    icon: '🛠️',
    title: 'Трубы',
    description: 'Профильные, круглые, ВГП, нержавеющие',
    image: '/img/catalog/trubi.jpeg'
  },
  {
    id: 'piles',
    icon: '📌',
    title: 'Сваи',
    description: 'Винтовые, забивные, свайные опоры',
    image: '/img/catalog/svai.jpeg'
  },
  {
    id: 'elbows',
    icon: '↩️',
    title: 'Отводы',
    description: 'Сварные, бесшовные, из нержавейки',
    image: '/img/inCategories/90.jpg'
  },
  {
    id: 'others',
    icon: '🧰',
    title: 'Прочее (прочая металлопродукция)',
    description: 'Арматура, листы, настилы, сетки, профнастил',
    image: '/img/categories/platform.jpg'
  }
]

// Карта изделий по категориям (для селекта)
export const categoryIdToProductsMap: Record<string, string[]> = {
  building_frames: ['Металлические фермы', 'Металлокаркасы ангаров и цехов', 'Лестничные марши, пролёты', 'Опоры и перекрытия'],
  columns_beams: ['Колонны стальные', 'Балки двутавровые', 'Швеллеры', 'Уголки'],
  pipes: ['Трубы профильные', 'Трубы круглые', 'ВГП (водогазопроводные)', 'Трубы нержавеющие'],
  piles: ['Винтовые сваи', 'Забивные сваи стальные', 'Свайные опоры'],
  elbows: ['Отводы стальные сварные', 'Отводы бесшовные', 'Отводы из нержавейки'],
  others: ['Арматура', 'Листы', 'Металлические настилы', 'Сетки сварные, рабица', 'Профнастил']
}

// Данные категорий с изделиями для CategoryPage
export const categoriesData: Record<string, { title: string; description: string; products: Product[] }> = {
  building_frames: {
    title: 'Каркасы зданий',
    description: 'Фермы, каркасы ангаров, марши, опоры и перекрытия',
    products: [
      { id: 'steel_trusses', title: 'Металлические фермы', description: 'Фермы покрытия и перекрытий', image: '/img/inCategories/fermi.jpg', fullDescription: 'Стальные фермы для больших пролетов.', specifications: [], application: '' },
      { id: 'angar_frames', title: 'Металлокаркасы ангаров и цехов', description: 'Каркасы для ангаров/цехов', image: '/img/inCategories/portalFrame.jpg', fullDescription: 'Каркасные решения для промышленных зданий.', specifications: [], application: '' },
      { id: 'stairs_flights', title: 'Лестничные марши, пролёты', description: 'Марши и площадки', image: '/img/categories/stairs.jpg', fullDescription: 'Лестничные марши и пролеты из металла.', specifications: [], application: '' },
      { id: 'supports_slabs', title: 'Опоры и перекрытия', description: 'Опоры и элементы перекрытий', image: '/img/categories/columns.jpg', fullDescription: 'Опорные конструкции и элементы перекрытий.', specifications: [], application: '' }
    ]
  },
  columns_beams: {
    title: 'Колонны и балки',
    description: 'Колонны стальные, двутавр, швеллер, уголок',
    products: [
      { id: 'steel_columns', title: 'Колонны стальные', description: 'Несущие колонны', image: '/img/inCategories/kolonniStalnie.jpg', fullDescription: 'Стальные колонны для каркасов.', specifications: [], application: '' },
      { id: 'i_beams', title: 'Балки двутавровые', description: 'Двутавровые балки', image: '/img/inCategories/balkiStalnie.webp', fullDescription: 'Двутавры для перекрытий.', specifications: [], application: '' },
      { id: 'channels', title: 'Швеллеры', description: 'Стальные швеллеры', image: '/img/categories/facade.webp', fullDescription: 'Швеллеры различных размеров.', specifications: [], application: '' },
      { id: 'angles', title: 'Уголки', description: 'Стальные уголки', image: '/img/categories/columns.jpg', fullDescription: 'Равнополочные и неравнополочные уголки.', specifications: [], application: '' }
    ]
  },
  pipes: {
    title: 'Трубы',
    description: 'Профильные, круглые, ВГП, нержавеющие',
    products: [
      { id: 'profile_pipes', title: 'Трубы профильные', description: 'Квадратные, прямоугольные', image: '/img/inCategories/trubiProfilnie.webp', fullDescription: 'Профильные трубы для каркасов.', specifications: [], application: '' },
      { id: 'round_pipes', title: 'Трубы круглые', description: 'Бесшовные, электросварные', image: '/img/inCategories/trubiKruglie.jpeg', fullDescription: 'Круглые трубы различных диаметров.', specifications: [], application: '' },
      { id: 'vgp', title: 'ВГП (водогазопроводные)', description: 'Трубы ВГП', image: '/img/categories/frame.webp', fullDescription: 'Трубы для водо- и газопроводов.', specifications: [], application: '' },
      { id: 'stainless_pipes', title: 'Трубы нержавеющие', description: 'Нержавеющие трубы', image: '/img/inCategories/trubiNerjaveyushie.jpg', fullDescription: 'Трубы из AISI 304/316.', specifications: [], application: '' }
    ]
  },
  piles: {
    title: 'Сваи',
    description: 'Винтовые, забивные, свайные опоры',
    products: [
      { id: 'screw_piles', title: 'Винтовые сваи', description: 'Быстрый монтаж', image: '/img/inCategories/svaiVintovie.jpeg', fullDescription: 'Винтовые сваи для лёгких сооружений.', specifications: [], application: '' },
      { id: 'driven_piles', title: 'Забивные сваи стальные', description: 'Высокая несущая способность', image: '/img/inCategories/svaiZabivnie.jpeg', fullDescription: 'Забивные сваи для капитальных объектов.', specifications: [], application: '' },
      { id: 'pile_supports', title: 'Свайные опоры', description: 'Опоры на сваях', image: '/img/categories/platform.jpg', fullDescription: 'Опоры для перекрытий и площадок.', specifications: [], application: '' }
    ]
  },
  elbows: {
    title: 'Отводы',
    description: 'Сварные, бесшовные, из нержавейки',
    products: [
      { id: 'welded_elbows', title: 'Отводы стальные сварные', description: 'Сегментные отводы', image: '/img/inCategories/otvodiSegmentnie.jpeg', fullDescription: 'Сегментные отводы по ТЗ.', specifications: [], application: '' },
      { id: 'seamless_elbows', title: 'Отводы бесшовные', description: 'Бесшовные колена', image: '/img/inCategories/45.jpg', fullDescription: 'Бесшовные колена для трубопроводов.', specifications: [], application: '' },
      { id: 'stainless_elbows', title: 'Отводы из нержавейки', description: 'Нержавеющие отводы', image: '/img/inCategories/90.jpg', fullDescription: 'Отводы из AISI 304/316.', specifications: [], application: '' }
    ]
  },
  others: {
    title: 'Прочее (прочая металлопродукция)',
    description: 'Арматура, листы, настилы, сетки, профнастил',
    products: [
      { id: 'rebar', title: 'Арматура', description: 'Стальная арматура', image: '/img/categories/columns.jpg', fullDescription: 'Горячекатаная арматура.', specifications: [], application: '' },
      { id: 'sheets', title: 'Листы', description: 'Рифлёные, оцинкованные, перфорированные', image: '/img/inCategories/trubiProfilnie.webp', fullDescription: 'Стальные листы разных типов.', specifications: [], application: '' },
      { id: 'gratings', title: 'Металлические настилы', description: 'Решетчатые настилы', image: '/img/inCategories/svaiVintovie.jpeg', fullDescription: 'Настилы для площадок и трапов.', specifications: [], application: '' },
      { id: 'meshes', title: 'Сетки сварные, рабица', description: 'Сварные и плетёные сетки', image: '/img/inCategories/trubiKruglie.jpeg', fullDescription: 'Сетки для ограждений и армирования.', specifications: [], application: '' },
      { id: 'profnastil', title: 'Профнастил', description: 'Профилированные листы', image: '/img/inCategories/trubiProfilnie.webp', fullDescription: 'Профнастил для кровли и ограждений.', specifications: [], application: '' }
    ]
  }
}
