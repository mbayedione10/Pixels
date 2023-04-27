import {
  AuthPage,
  ErrorComponent,
  ReadyPage,
  notificationProvider,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";
import { Refine } from "@pankod/refine-core";

import routerProvider from "@pankod/refine-react-router-v6";
import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import {
  Footer,
  Header,
  Layout,
  OffLayoutArea,
  Sider,
  Title,
} from "components/layout";
import { ColorModeContextProvider } from "contexts";
import { supabaseClient } from "utility";
import authProvider from "./authProvider";

function App() {
  return (
    <ColorModeContextProvider>
      <Refine
        dataProvider={dataProvider(supabaseClient)}
        liveProvider={liveProvider(supabaseClient)}
        authProvider={authProvider}
        routerProvider={{
          ...routerProvider,
          routes: [
            {
              path: "/register",
              element: <AuthPage type="register" />,
            },
            {
              path: "/forgot-password",
              element: <AuthPage type="forgotPassword" />,
            },
            {
              path: "/update-password",
              element: <AuthPage type="updatePassword" />,
            },
          ],
        }}
        LoginPage={() => (
          <AuthPage
            type="login"
            providers={[
              {
                name: "google",
                label: "Sign in with Google",
              },
            ]}
            formProps={{
              initialValues: {
                email: "info@refine.dev",
                password: "refine-supabase",
              },
            }}
          />
        )}
        notificationProvider={notificationProvider}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
        Title={Title}
        Header={Header}
        Sider={Sider}
        Footer={Footer}
        Layout={Layout}
        OffLayoutArea={OffLayoutArea}
      />
    </ColorModeContextProvider>
  );
}

export default App;
