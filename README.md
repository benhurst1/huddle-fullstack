Open a terminal window, copy and paste to clone the project

```
git clone https://github.com/benhurst1/huddle-fullstack.git BenHurst-HuddleFullStack
```

Navigate into the project

```
cd BenHurst-HuddleFullStack
```

Create a database called huddle. Note: If postgres username is not possible, replace with one you use.

```
createdb -U postgres huddle
```

populate the database with a few pieces of data

```
psql -U postgres -d huddle < dump.sql
```

install the dependicies

```
npm install
```

If you used a different username, create an .env file

```
code .env
```

and paste in the below while adding your username

```
DEV_USER = {username}
NODE_ENV = development
```

run the server

```
npm run dev
```
