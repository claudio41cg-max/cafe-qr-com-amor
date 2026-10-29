import { useState } from 'react'
import MenuContent from '../components/menu/MenuContent.jsx'

// Demonstração segura: utiliza a interface ORIGINAL do Karecik.
// Nenhuma conta ou produto real do banco de dados é modificado.
const menu = {
  "business": {
    "business_name": "Café com Amor",
    "name": "Cardápio Principal",
    "business_slug": "cafe-com-amor",
    "menu_slug": "cardapio-principal",
    "theme": "classic",
    "primary_color": "#663e2e",
    "default_language": "pt",
    "languages": [
      "pt"
    ],
    "currency": "BRL",
    "currency_symbol": "R$",
    "header_display": "name",
    "description": "Um carinho a cada xícara",
    "slogan": "Um carinho a cada xícara",
    "show_search": true
  },
  "categories": [
    {
      "id": 1,
      "name": "Cafés quentes",
      "emoji": "☕",
      "is_active": true,
      "sort_order": 0,
      "products": [
        {
          "id": 100,
          "name": "Espresso",
          "description": "Café intenso e aromático, com crema dourada.",
          "price": 8,
          "image_url": "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 0
        },
        {
          "id": 101,
          "name": "Espresso duplo",
          "description": "Duas doses de café encorpado.",
          "price": 12,
          "image_url": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 1
        },
        {
          "id": 102,
          "name": "Americano",
          "description": "Espresso alongado com água quente.",
          "price": 10,
          "image_url": "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 2
        },
        {
          "id": 103,
          "name": "Coado da casa",
          "description": "Café filtrado fresco e suave.",
          "price": 12,
          "image_url": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 3
        },
        {
          "id": 104,
          "name": "Café com leite",
          "description": "A combinação clássica de café e leite quente.",
          "price": 11,
          "image_url": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 4
        },
        {
          "id": 105,
          "name": "Cappuccino da casa",
          "description": "Espresso, leite cremoso, canela e cacau.",
          "price": 15,
          "image_url": "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 5
        },
        {
          "id": 106,
          "name": "Latte",
          "description": "Espresso com leite vaporizado e espuma delicada.",
          "price": 14,
          "image_url": "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 6
        },
        {
          "id": 107,
          "name": "Mocha",
          "description": "Espresso, leite vaporizado e chocolate.",
          "price": 18,
          "image_url": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 7
        },
        {
          "id": 108,
          "name": "Chocolate quente",
          "description": "Chocolate cremoso servido bem quentinho.",
          "price": 16,
          "image_url": "https://images.unsplash.com/photo-1542990253-0b8be00f0f0ed?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 8
        }
      ]
    },
    {
      "id": 2,
      "name": "Cafés gelados",
      "emoji": "🧊",
      "is_active": true,
      "sort_order": 1,
      "products": [
        {
          "id": 200,
          "name": "Iced latte",
          "description": "Espresso, leite gelado e bastante gelo.",
          "price": 16,
          "image_url": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 0
        },
        {
          "id": 201,
          "name": "Café gelado",
          "description": "Café refrescante servido sobre gelo.",
          "price": 15,
          "image_url": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 1
        },
        {
          "id": 202,
          "name": "Frappé de café",
          "description": "Café batido com leite e gelo.",
          "price": 19,
          "image_url": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 2
        },
        {
          "id": 203,
          "name": "Affogato",
          "description": "Sorvete de baunilha com espresso quente.",
          "price": 18,
          "image_url": "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 3
        },
        {
          "id": 204,
          "name": "Espresso tônica",
          "description": "Espresso, água tônica e gelo.",
          "price": 17,
          "image_url": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 4
        }
      ]
    },
    {
      "id": 3,
      "name": "Salgados",
      "emoji": "🥐",
      "is_active": true,
      "sort_order": 2,
      "products": [
        {
          "id": 300,
          "name": "Pão na chapa com amor",
          "description": "Pão dourado na chapa com manteiga.",
          "price": 8,
          "image_url": "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 0
        },
        {
          "id": 301,
          "name": "Pão de queijo",
          "description": "Cestinha de pães de queijo quentinhos.",
          "price": 14,
          "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 1
        },
        {
          "id": 302,
          "name": "Misto quente artesanal",
          "description": "Pão tostado com presunto e queijo.",
          "price": 18,
          "image_url": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 2
        },
        {
          "id": 303,
          "name": "Croissant de presunto e queijo",
          "description": "Massa folhada amanteigada com recheio cremoso.",
          "price": 19,
          "image_url": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 3
        },
        {
          "id": 304,
          "name": "Croissant caprese",
          "description": "Croissant com queijo, tomate e manjericão.",
          "price": 21,
          "image_url": "https://images.unsplash.com/photo-1608198093002-ad4e005484df?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 4
        },
        {
          "id": 305,
          "name": "Empada de frango",
          "description": "Massa delicada e frango cremoso.",
          "price": 12,
          "image_url": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 5
        }
      ]
    },
    {
      "id": 4,
      "name": "Doces e sobremesas",
      "emoji": "🍰",
      "is_active": true,
      "sort_order": 3,
      "products": [
        {
          "id": 400,
          "name": "Bolo do dia",
          "description": "Fatia de bolo caseiro fresquinho.",
          "price": 12,
          "image_url": "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 0
        },
        {
          "id": 401,
          "name": "Brownie de chocolate",
          "description": "Brownie macio, rico em chocolate.",
          "price": 13,
          "image_url": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 1
        },
        {
          "id": 402,
          "name": "Cookie de chocolate",
          "description": "Cookie artesanal com gotas de chocolate.",
          "price": 8,
          "image_url": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 2
        },
        {
          "id": 403,
          "name": "Cheesecake",
          "description": "Fatia cremosa com calda de frutas.",
          "price": 15,
          "image_url": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 3
        },
        {
          "id": 404,
          "name": "Banoffee",
          "description": "Banana, doce de leite e chantilly.",
          "price": 16,
          "image_url": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 4
        },
        {
          "id": 405,
          "name": "Croissant de avelã",
          "description": "Croissant recheado com creme de avelã.",
          "price": 17,
          "image_url": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 5
        }
      ]
    },
    {
      "id": 5,
      "name": "Combos",
      "emoji": "❤️",
      "is_active": true,
      "sort_order": 4,
      "products": [
        {
          "id": 500,
          "name": "Combo bom dia",
          "description": "Espresso e pão na chapa.",
          "price": 13.9,
          "image_url": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 0
        },
        {
          "id": 501,
          "name": "Combo café da tarde",
          "description": "Cappuccino da casa e bolo do dia.",
          "price": 24.9,
          "image_url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 1
        },
        {
          "id": 502,
          "name": "Combo pausa doce",
          "description": "Latte com cookie de chocolate.",
          "price": 19.9,
          "image_url": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 2
        },
        {
          "id": 503,
          "name": "Combo gelado",
          "description": "Iced latte e brownie de chocolate.",
          "price": 26.9,
          "image_url": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=760&q=80",
          "is_active": true,
          "sort_order": 3
        }
      ]
    }
  ],
  "menus": [],
  "footer": {}
}

export default function CafeDemo() {
 const [language,setLanguage] = useState('pt')
 return <><div style={{background:'#38241c',color:'#fff',textAlign:'center',padding:'9px 12px',fontSize:12}}>Cardápio demonstrativo · produtos e valores ilustrativos</div><MenuContent menu={menu} language={language} onLanguageChange={setLanguage} showMenuSwitcher={false}/></>
}
