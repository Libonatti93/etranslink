# Cores

## Paleta principal

| Token | Hex | Uso |
| --- | --- | --- |
| Ink | `#111712` | Texto principal e superfícies escuras |
| Deep Ink | `#0D1510` | Fundo da inteligência sul-americana |
| Forest | `#162119` | Cards de dados em fundo escuro |
| Signal Green | `#D1FF43` | Ações, números e informação ao vivo |
| Brand Green | `#B7F137` | Destaques da edição brasileira |
| Paper | `#F2F4EC` | Fundo editorial |
| White | `#FFFFFF` | Cards e texto invertido |
| Orange | `#FF6B00` | Alertas, tendência de alta e contraste auxiliar |
| Muted | `#697169` | Texto secundário em superfícies claras |

## Contraste

- Em superfícies escuras, usar `#F7F8F3` para texto e `#D1FF43` para números.
- Nunca usar verde vivo como texto sobre fundos claros.
- Texto secundário no fundo escuro deve ser no mínimo `#AEB9B0`.
- Laranja representa atenção ou alta; não deve ser a única indicação de estado.

## Tokens CSS

Os tokens implementados ficam em `:root` no arquivo `styles.css`. Toda nova cor deve entrar primeiro neste documento e depois no código.
