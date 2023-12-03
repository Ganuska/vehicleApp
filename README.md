Mono test
Setting Up For Development
Vite requires Node.js version 16+
Execute the following commands:

npm install
If you want to work with the dev api:

npm run dev

Project Structure
src
├── assets            # all static files
├── common            # shared endpoints used across the application and general utils used
├── components        # shared components used across the entire application
├── layouts           # global layouts.
├── lib               # libraries preconfigured for the application
├── Pages             # components used as route components
├── routes            # routes configuration
├── Stores            # MobX
├── types             # base types used across the application
Styling
Tailwindcss for styling

State Management
The application's state is managed with the use of Mobx
