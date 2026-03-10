# getcoherent.design

Marketing website for [Coherent Design Method](https://github.com/skovtun/coherent-design-method).

Built with Next.js 15 + Tailwind CSS. Deployed on Vercel.

## Development

```bash
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).
## Deploy

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
EXPOSE 3000
```

