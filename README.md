# Etranslink

Portal editorial, plataforma de inteligência de custos e ponto de conexão para a logística brasileira e sul-americana.

## Produto

A Etranslink combina três frentes:

- conteúdo especializado para transporte, agro, indústria, varejo e comércio exterior;
- indicadores de custos operacionais, com contexto regional e transparência de fonte;
- geração de oportunidades entre embarcadores e transportadores.

O produto possui edições independentes:

- `/pt-br/`: Brasil, com indicadores por região;
- `/es/`: América do Sul, com mapa continental e diesel por país.

## Tecnologias

- HTML5 semântico
- CSS3 responsivo
- JavaScript sem dependências
- dados estruturados Schema.org
- SEO internacional com canonical e `hreflang`
- Nginx
- Docker
- Caddy como proxy reverso e TLS automático

## Executar com Docker

```bash
docker build -t etranslink .
docker run --rm -p 8081:80 etranslink
```

Acesse `http://localhost:8081/`. O idioma é sugerido pelo cabeçalho do navegador e também pode ser escolhido no menu.

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Redirecionamento por idioma |
| `/pt-br/` | Edição brasileira |
| `/es/` | Edição sul-americana em espanhol |
| `/robots.txt` | Regras para buscadores e crawlers de IA |
| `/sitemap.xml` | Sitemap internacional |

## Dados

Os indicadores devem sempre informar moeda, unidade, data e fonte. Preços podem variar por cidade, fornecedor, especificação, impostos e subsídios. Valores demonstrativos precisam ser identificados como tal.

## Identidade da marca

O sistema visual está documentado em [`docs/brand`](docs/brand/README.md).

## Produção

Domínio planejado: [etranslink.digital](https://etranslink.digital/)

Infraestrutura atual: container Nginx em uma VPS, atrás de Caddy.

## Licença

Código proprietário da Etranslink. Mapas vetoriais utilizados na interface possuem licença CC0 e origem documentada no guia da marca.
