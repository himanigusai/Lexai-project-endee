# LexAI Search

LexAI Search is a production-style full-stack legal document intelligence platform built for semantic retrieval, clause discovery, question answering, and similar-document exploration. It is designed as a hiring-challenge MVP that demonstrates real-world AI engineering with **Endee Vector Database** at the core of the retrieval stack.

## Why This Matters

Legal teams and business operators lose significant time searching contracts, policies, judgments, and compliance documents manually. LexAI Search turns those static files into a searchable knowledge base where users can:

- Upload PDF, DOCX, and TXT legal documents
- Run semantic search using vector retrieval
- Ask grounded AI questions over their corpus
- Discover clauses such as arbitration, payment, confidentiality, and non-compete
- Explore related documents for faster comparison workflows

## Why Endee

Endee is used as the retrieval engine for the most important product experiences:

- `legal_docs_index` powers semantic document search and RAG retrieval
- `clauses_index` powers clause-focused discovery workflows
- Dense vectors are generated during ingestion and upserted with metadata and filters
- Query embeddings are searched against Endee in real time for high-relevance results

This makes LexAI Search a strong fit for real AI engineering expectations around:

- Semantic search
- RAG pipelines
- Similarity search
- Recommendation-style retrieval
- Production-oriented vector infrastructure

## Architecture

```text
React + Vite + Tailwind
        |
        v
Express API + JWT Auth + Multer Uploads
        |
        +--> MongoDB (users, documents, search logs)
        |
        +--> Parsing Layer (pdf-parse, mammoth, txt reader)
        |
        +--> Embedding Service (provider abstraction: local hash / OpenAI)
        |
        +--> Endee Vector Database
              - legal_docs_index
              - clauses_index
```

## Product Features

### Core AI Features

- Semantic legal document search
- Retrieval-Augmented Generation question answering
- Clause finder for common legal sections
- Similar document discovery
- Provider-based embedding architecture for future upgrades

### Product Features

- JWT authentication with `user` and `admin` roles
- User dashboard with document and search activity metrics
- Admin dashboard with organization-wide usage insights
- Premium responsive law-tech UI
- Secure upload pipeline with file type validation and rate limiting

## Project Structure

```text
lexai-search/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/
│   └── package.json
├── screenshots/
├── README.md
└── .env.example
```

## Setup

### 1. Clone and configure

```bash
cd lexai-search
cp .env.example .env
```

### 2. Start MongoDB

Use a local MongoDB instance or MongoDB Atlas, then update `MONGODB_URI`.

### 3. Start Endee

Based on the official Endee quickstart:

```bash
docker run \
  -p 8080:8080 \
  -v ./endee-data:/data \
  --name endee-server \
  endeeio/endee-server:latest
```

If you use authentication, set `ENDEE_TOKEN` and keep `ENDEE_BASE_URL=http://127.0.0.1:8080/api/v1`.

### 4. Install dependencies

#### Server

```bash
cd server
npm install
npm run init:indexes
npm run dev
```

#### Client

```bash
cd client
npm install
npm run dev
```

## Environment Variables

Key values in `.env.example`:

- `MONGODB_URI`
- `JWT_SECRET`
- `ENDEE_TOKEN`
- `ENDEE_BASE_URL`
- `EMBEDDING_PROVIDER`
- `EMBEDDING_DIMENSION`
- `OPENAI_API_KEY`
- `OPENAI_EMBEDDING_MODEL`
- `OPENAI_CHAT_MODEL`

## Embedding Design

The embedding layer is intentionally production-extensible:

- `local-hash` provides a deterministic zero-cost default for offline development
- `openai` can be enabled for stronger semantic quality in production
- the service boundary is isolated in `server/src/services/embeddingService.js`

This means a hiring reviewer can see that the architecture is ready for:

- OpenAI embeddings
- HuggingFace inference APIs
- local embedding servers
- future model swaps without touching controller logic

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Documents

- `POST /api/docs/upload`
- `GET /api/docs/my`
- `GET /api/docs/:id`
- `DELETE /api/docs/:id`
- `GET /api/docs/similar/:id`

### Search

- `POST /api/search`
- `POST /api/ask`
- `POST /api/clauses/search`
- `GET /api/search/overview`

### Dashboard

- `GET /api/dashboard/user`
- `GET /api/dashboard/admin`

## Upload + Retrieval Flow

1. User uploads a legal file with metadata.
2. The server extracts raw text using `pdf-parse`, `mammoth`, or text loading.
3. The document is chunked into retrieval-sized sections.
4. Each chunk receives a dense embedding through the provider abstraction.
5. Chunks are upserted into Endee with metadata and filters.
6. Semantic search and RAG APIs embed the user query and retrieve top matches from Endee.
7. The answer layer returns grounded responses with source passages.

## Screenshots

Place final UI screenshots here:

- `screenshots/home.png`
- `screenshots/dashboard.png`
- `screenshots/search.png`
- `screenshots/ask-ai.png`
- `screenshots/admin.png`

## Quality Notes

- Production-style MVC backend organization
- Centralized error handling
- JWT protection and role-based authorization
- Rate limiting and secure file filtering
- Responsive premium frontend with reusable components
- Mongo models for users, documents, and search telemetry

## Future Scope

- Real document-to-document similarity via centroid vectors or stored document embeddings
- OCR pipeline for scanned PDFs
- Highlighted answer citations inside the original document viewer
- Multi-tenant organizations and shared workspaces
- Audit trails and exportable legal memos
- Hybrid sparse + dense search using Endee BM25 workflows

## Screenshots Placeholder

The `screenshots/` directory is included so polished product images can be added before submission.
