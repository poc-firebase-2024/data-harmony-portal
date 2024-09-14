import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          home: 'Home',
          dependencies: 'Dependencies',
          login: 'Login',
          loginWithGithub: 'Login with GitHub',
          loginWithGoogle: 'Login with Google',
          loginWithFacebook: 'Login with Facebook',
          loginWithApple: 'Login with Apple',
          loginWithEmail: 'Login with Email',
          forgotPassword: 'Forgot Password',
          signUp: 'Sign Up',
          allRightsReserved: 'All rights reserved',
          owner: 'Owner',
          tableName: 'Table Name',
          fetch: 'Fetch',
          loading: 'Loading...',
          error: 'Error',
          zoomIn: 'Zoom In',
          zoomOut: 'Zoom Out',
          selectFormat: 'Select Format',
          mermaid: 'Mermaid',
          json: 'JSON',
          tree: 'Tree',
          fileUpload: 'File Upload',
          dbaTablesFile: 'DBA_TABLES File',
          dbaConstraintsFile: 'DBA_CONSTRAINTS File',
          upload: 'Upload',
          pleaseSelectFile: 'Please select a {{fileType}} file before uploading',
          uploadSuccess: '{{fileType}} uploaded successfully',
          uploadError: 'Error uploading {{fileType}}: {{error}}',
        },
      },
      pt: {
        translation: {
          home: 'Início',
          dependencies: 'Dependências',
          login: 'Entrar',
          loginWithGithub: 'Entrar com GitHub',
          loginWithGoogle: 'Entrar com Google',
          loginWithFacebook: 'Entrar com Facebook',
          loginWithApple: 'Entrar com Apple',
          loginWithEmail: 'Entrar com E-mail',
          forgotPassword: 'Esqueceu a Senha',
          signUp: 'Cadastrar-se',
          allRightsReserved: 'Todos os direitos reservados',
          owner: 'Proprietário',
          tableName: 'Nome da Tabela',
          fetch: 'Buscar',
          loading: 'Carregando...',
          error: 'Erro',
          zoomIn: 'Aumentar Zoom',
          zoomOut: 'Diminuir Zoom',
          selectFormat: 'Selecionar Formato',
          mermaid: 'Mermaid',
          json: 'JSON',
          tree: 'Árvore',
          fileUpload: 'Upload de Arquivos',
          dbaTablesFile: 'Arquivo DBA_TABLES',
          dbaConstraintsFile: 'Arquivo DBA_CONSTRAINTS',
          upload: 'Enviar',
          pleaseSelectFile: 'Por favor, selecione o arquivo {{fileType}} antes de enviar',
          uploadSuccess: '{{fileType}} enviado com sucesso',
          uploadError: 'Erro ao enviar {{fileType}}: {{error}}',
        },
      },
    },
    lng: 'pt', // Set the default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
