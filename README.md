

<div align="center">
  <img src="./public/images/mac.gif" alt="App" width="400"/>
</div>




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# School-Managemen

# Create Migrations

```bash
npx sequelize-cli migration:generate --name create-schools
```

# Run Migrations

```bash
npx sequelize-cli db:seed:all
```

```bash
npx sequelize-cli db:migrate
```

# Undo Migration

```bash
npx sequelize-cli db:migrate:undo
```

## Creating db and user in db

#### Step 1: Create the database

```bash
CREATE DATABASE school_management;
```

#### Step 2: Create a user and grant privileges

-- Replace 'root' and '0000' with your desired username and password

```bash
CREATE USER 'root'@'localhost' IDENTIFIED BY '0000';
```

#### Step 3: Grant full access to the database for this user

```bash
GRANT ALL PRIVILEGES ON school_management.* TO 'root'@'localhost';
```

#### Step 4: Apply the changes

```bash
FLUSH PRIVILEGES;
```

#### Step 5: Make Mysql have root access only (optional)

```bash
UPDATE mysql.user SET authentication_string='0000', plugin='mysql_native_password' WHERE user='root';
```

```bash
FLUSH PRIVILEGES;
```
