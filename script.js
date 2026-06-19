const logoInput = document.getElementById("logoInput");
const logoFileName = document.getElementById("logoFileName");
const logoScale = document.getElementById("logoScale");
const logoScaleValue = document.getElementById("logoScaleValue");
const logoScaleSuffix = document.getElementById("logoScaleSuffix");
const logoPadding = document.getElementById("logoPadding");
const logoPaddingValue = document.getElementById("logoPaddingValue");
const logoPaddingSuffix = document.getElementById("logoPaddingSuffix");
const generateButton = document.getElementById("generateButton");
const generateButtonLabel = document.getElementById("generateButtonLabel");
const downloadButton = document.getElementById("downloadButton");
const statusMessage = document.getElementById("statusMessage");
const qrCanvas = document.getElementById("qrCanvas");
const previewFrame = document.getElementById("previewFrame");
const languageButtons = document.querySelectorAll("[data-language-button]");
const historyButton = document.getElementById("historyButton");
const historyModal = document.getElementById("historyModal");
const historyList = document.getElementById("historyList");
const clearHistoryButton = document.getElementById("clearHistoryButton");
const closeHistoryButton = document.getElementById("closeHistoryButton");
const historyModalStatus = document.getElementById("historyModalStatus");
const exportHistoryButton = document.getElementById("exportHistoryButton");
const importHistoryButton = document.getElementById("importHistoryButton");
const importFileInput = document.getElementById("importFileInput");
const qrColorDark = document.getElementById("qrColorDark");
const qrColorLight = document.getElementById("qrColorLight");
const qrNameInput = document.getElementById("qrName");
const textCharCounter = document.getElementById("textCharCounter");
const frameEnabledInput = document.getElementById("frameEnabled");
const frameOptions = document.getElementById("frameOptions");
const frameTextInput = document.getElementById("frameText");
const frameColorInput = document.getElementById("frameColor");
const frameTextColorInput = document.getElementById("frameTextColor");
const presetLogosButton = document.getElementById("presetLogosButton");
const presetLogosModal = document.getElementById("presetLogosModal");
const closePresetLogosButton = document.getElementById("closePresetLogosButton");
const manualButton = document.getElementById("manualButton");
const manualModal = document.getElementById("manualModal");
const closeManualButton = document.getElementById("closeManualButton");
const footerManualButton = document.getElementById("footerManualButton");
const footerHistoryButton = document.getElementById("footerHistoryButton");
const headerMenuToggle = document.getElementById("headerMenuToggle");
const headerMenuPanel = document.getElementById("headerMenuPanel");

const LANGUAGE_STORAGE_KEY = "free-qrcode-language";
const HISTORY_STORAGE_KEY = "free-qrcode-history";
const LANGUAGE_QUERY_PARAM = "lang";
const DEFAULT_LANGUAGE = "pt-BR";
const DEFAULT_QR_SIZE = 512;
const QR_TEXT_MAX_CHARS = 500;
const APP_BASE_URL = "http://freeqrcode.rxmos.dev.br/";
const FRAME_SIDE = 20;
const FRAME_TOP = 20;
const FRAME_BOTTOM = 72;
const FRAME_OUTER_R = 24;
const FRAME_INNER_R = 8;
const FRAME_FONT_SIZE = 32;

const QR_TYPE_PRIMARY_FIELD = {
  link: "qrField-link-url",
  text: "qrField-text-content",
  email: "qrField-email-to",
  call: "qrField-call-number",
  whatsapp: "qrField-whatsapp-number",
  vcard: "qrField-vcard-firstname",
  wifi: "qrField-wifi-ssid",
};

const COUNTRY_CODES = [
  ["Abkhazia", "7840"], ["Abkhazia", "7940"], ["Afghanistan", "93"], ["Albania", "355"],
  ["Algeria", "213"], ["American Samoa", "1684"], ["Andorra", "376"], ["Angola", "244"],
  ["Anguilla", "1264"], ["Antigua and Barbuda", "1268"], ["Argentina", "54"],
  ["Armenia", "374"], ["Aruba", "297"], ["Ascension", "247"], ["Australia", "61"],
  ["Australian External Territories", "672"], ["Austria", "43"], ["Azerbaijan", "994"],
  ["Bahamas", "1242"], ["Bahrain", "973"], ["Bangladesh", "880"], ["Barbados", "1246"],
  ["Barbuda", "1268"], ["Belarus", "375"], ["Belgium", "32"], ["Belize", "501"],
  ["Benin", "229"], ["Bermuda", "1441"], ["Bhutan", "975"], ["Bolivia", "591"],
  ["Bosnia and Herzegovina", "387"], ["Botswana", "267"], ["Brazil", "55"],
  ["British Indian Ocean Territory", "246"], ["British Virgin Islands", "1284"],
  ["Brunei", "673"], ["Bulgaria", "359"], ["Burkina Faso", "226"], ["Burundi", "257"],
  ["Cambodia", "855"], ["Cameroon", "237"], ["Canada", "1"], ["Cape Verde", "238"],
  ["Cayman Islands", "345"], ["Central African Republic", "236"], ["Chad", "235"],
  ["Chile", "56"], ["China", "86"], ["Christmas Island", "61"], ["Cocos-Keeling Islands", "61"],
  ["Colombia", "57"], ["Comoros", "269"], ["Congo", "242"], ["Congo (Zaire)", "243"],
  ["Cook Islands", "682"], ["Costa Rica", "506"], ["Ivory Coast", "225"],
  ["Croatia", "385"], ["Cuba", "53"], ["Curacao", "599"], ["Cyprus", "357"],
  ["Czech Republic", "420"], ["Denmark", "45"], ["Diego Garcia", "246"],
  ["Djibouti", "253"], ["Dominica", "1767"], ["Dominican Republic", "1809"],
  ["Dominican Republic", "1829"], ["Dominican Republic", "1849"], ["East Timor", "670"],
  ["Easter Island", "56"], ["Ecuador", "593"], ["Egypt", "20"], ["El Salvador", "503"],
  ["Equatorial Guinea", "240"], ["Eritrea", "291"], ["Estonia", "372"],
  ["Ethiopia", "251"], ["Falkland Islands", "500"], ["Faroe Islands", "298"],
  ["Fiji", "679"], ["Finland", "358"], ["France", "33"], ["French Antilles", "596"],
  ["French Guiana", "594"], ["French Polynesia", "689"], ["Gabon", "241"],
  ["Gambia", "220"], ["Georgia", "995"], ["Germany", "49"], ["Ghana", "233"],
  ["Gibraltar", "350"], ["Greece", "30"], ["Greenland", "299"], ["Grenada", "1473"],
  ["Guadeloupe", "590"], ["Guam", "1671"], ["Guatemala", "502"], ["Guinea", "224"],
  ["Guinea-Bissau", "245"], ["Guyana", "595"], ["Haiti", "509"], ["Honduras", "504"],
  ["Hong Kong SAR China", "852"], ["Hungary", "36"], ["Iceland", "354"], ["India", "91"],
  ["Indonesia", "62"], ["Iran", "98"], ["Iraq", "964"], ["Ireland", "353"],
  ["Israel", "972"], ["Italy", "39"], ["Jamaica", "1876"], ["Japan", "81"],
  ["Jordan", "962"], ["Kazakhstan", "77"], ["Kenya", "254"], ["Kiribati", "686"],
  ["North Korea", "850"], ["South Korea", "82"], ["Kuwait", "965"],
  ["Kyrgyzstan", "996"], ["Laos", "856"], ["Latvia", "371"], ["Lebanon", "961"],
  ["Lesotho", "266"], ["Liberia", "231"], ["Libya", "218"], ["Liechtenstein", "423"],
  ["Lithuania", "370"], ["Luxembourg", "352"], ["Macau SAR China", "853"],
  ["Macedonia", "389"], ["Madagascar", "261"], ["Malawi", "265"], ["Malaysia", "60"],
  ["Maldives", "960"], ["Mali", "223"], ["Malta", "356"], ["Marshall Islands", "692"],
  ["Martinique", "596"], ["Mauritania", "222"], ["Mauritius", "230"],
  ["Mayotte", "262"], ["Mexico", "52"], ["Micronesia", "691"], ["Midway Island", "1808"],
  ["Moldova", "373"], ["Monaco", "377"], ["Mongolia", "976"], ["Montenegro", "382"],
  ["Montserrat", "1664"], ["Morocco", "212"], ["Myanmar", "95"], ["Namibia", "264"],
  ["Nauru", "674"], ["Nepal", "977"], ["Netherlands", "31"],
  ["Netherlands Antilles", "599"], ["Nevis", "1869"], ["New Caledonia", "687"],
  ["New Zealand", "64"], ["Nicaragua", "505"], ["Niger", "227"], ["Nigeria", "234"],
  ["Niue", "683"], ["Norfolk Island", "672"], ["Northern Mariana Islands", "1670"],
  ["Norway", "47"], ["Oman", "968"], ["Pakistan", "92"], ["Palau", "680"],
  ["Palestinian Territory", "970"], ["Panama", "507"], ["Papua New Guinea", "675"],
  ["Paraguay", "595"], ["Peru", "51"], ["Philippines", "63"], ["Poland", "48"],
  ["Portugal", "351"], ["Puerto Rico", "1787"], ["Puerto Rico", "1939"],
  ["Qatar", "974"], ["Reunion", "262"], ["Romania", "40"], ["Russia", "7"],
  ["Rwanda", "250"], ["Samoa", "685"], ["San Marino", "378"], ["Saudi Arabia", "966"],
  ["Senegal", "221"], ["Serbia", "381"], ["Seychelles", "248"],
  ["Sierra Leone", "232"], ["Singapore", "65"], ["Slovakia", "421"],
  ["Slovenia", "386"], ["Solomon Islands", "677"], ["South Africa", "27"],
  ["South Georgia and S. Sandwich Islands", "500"], ["Spain", "34"],
  ["Sri Lanka", "94"], ["Sudan", "249"], ["Suriname", "597"], ["Swaziland", "268"],
  ["Sweden", "46"], ["Switzerland", "41"], ["Syria", "963"], ["Taiwan", "886"],
  ["Tajikistan", "992"], ["Tanzania", "255"], ["Thailand", "66"],
  ["Timor Leste", "670"], ["Togo", "228"], ["Tokelau", "690"], ["Tonga", "676"],
  ["Trinidad and Tobago", "1868"], ["Tunisia", "216"], ["Turkey", "90"],
  ["Turkmenistan", "993"], ["Turks and Caicos Islands", "1649"], ["Tuvalu", "688"],
  ["Uganda", "256"], ["Ukraine", "380"], ["United Arab Emirates", "971"],
  ["United Kingdom", "44"], ["United States", "1"], ["Uruguay", "598"],
  ["U.S. Virgin Islands", "1340"], ["Uzbekistan", "998"], ["Vanuatu", "678"],
  ["Venezuela", "58"], ["Vietnam", "84"], ["Wake Island", "1808"],
  ["Wallis and Futuna", "681"], ["Yemen", "967"], ["Zambia", "260"],
  ["Zanzibar", "255"], ["Zimbabwe", "263"],
];

const PRESET_LOGOS = [
  { name: "Facebook", file: "logos/facebook.svg" },
  { name: "GitHub", file: "logos/github.svg" },
  { name: "Instagram", file: "logos/instagram.svg" },
  { name: "LinkedIn", file: "logos/linkedin.svg" },
  { name: "Pinterest", file: "logos/pinterest.svg" },
  { name: "Telegram", file: "logos/telegram.svg" },
  { name: "TikTok", file: "logos/tiktok.svg" },
  { name: "WhatsApp", file: "logos/whatsapp.svg" },
  { name: "X", file: "logos/x.svg" },
  { name: "YouTube", file: "logos/youtube.svg" },
];

const MANUAL_SECTIONS = [
  ["s1title", "s1body"],
  ["s2title", "s2body"],
  ["s3title", "s3body"],
  ["s4title", "s4body"],
  ["s5title", "s5body"],
  ["s6title", "s6body"],
  ["s7title", "s7body"],
  ["s8title", "s8body"],
];

const STATUS_STYLE_MAP = {
  info: "status-info",
  success: "status-success",
  error: "status-error",
};

const TRANSLATIONS = {
  "pt-BR": {
    ui: {
      badge: "studio edition · sem cadastro",
      heroTitle: "Crie um QR Code com identidade visual forte.",
      heroDescription:
        "Digite o conteúdo, aplique sua marca no centro e exporte em PNG pronto para impressão, cardápio, embalagem ou campanha.",
      languageLabel: "Idioma",
      creativeDirectionLabel: "direção criativa",
      creativeDirectionTitle: "Editorial print com contraste de pôster.",
      creativeDirectionDescription: "Tipografia expressiva, bordas marcantes e atmosfera de papel texturizado.",
      panelBadge: "painel",
      contentLabel: "Conteúdo",
      contentPlaceholder: "https://seusite.com",
      logoLabel: "Logo opcional",
      logoFileDefault: "Nenhuma logo selecionada.",
      logoSizeLabel: "Tamanho da logo",
      logoScaleSuffix: "% do QR",
      logoPaddingLabel: "Margem branca",
      logoPaddingSuffix: "% do QR",
      generateButtonIdle: "Gerar QR Code",
      generateButtonLoading: "Gerando...",
      downloadButton: "Baixar PNG",
      previewBadge: "preview",
      cameraTip: "Dica: use URL completa com https:// para melhorar a leitura em aplicativos de câmera.",
      footerText: "Made with luv by @yurirxmos · updated by @almeidaoffsec",
      footerBrandDescription: "Gerador de QR Code gratuito com logo, frame e histórico local. Mantido por @almeidaoffsec.",
      footerNavLabel: "Navegação",
      footerNavTop: "Início",
      footerNavManual: "Manual",
      footerNavHistory: "Histórico",
      footerNavSource: "Código-fonte",
      footerSocialLabel: "Redes",
      footerStatus: "gerador online",
      qrColorDarkLabel: "Cor do QR",
      qrColorLightLabel: "Cor do fundo",
      historyPreview: "Preview",
      historyButton: "Histórico",
      historyModalTitle: "Histórico de QR Codes",
      historyEmpty: "Nenhum QR Code gerado ainda.",
      historyClearButton: "Limpar",
      historyDownload: "Baixar",
      historyDelete: "Excluir",
      historyCloseButton: "Fechar",
      historyExportButton: "Exportar JSON",
      historyImportButton: "Importar JSON",
      historyImportSuccess: "Importado com sucesso.",
      historyImportError: "Arquivo inválido.",
      historyClone: "Clonar",
      cloneNotAvailable: "Este QR não tem dados suficientes para clonar.",
      qrNameLabel: "Nome (opcional)",
      qrNamePlaceholder: "Ex: Cardápio do restaurante",
      frameLabel: "Adicionar frame",
      frameTextLabel: "Texto do frame",
      frameTextPlaceholder: "exemplo",
      frameColorLabel: "Cor do frame",
      frameTextColorLabel: "Cor do texto",
      typeLabel: "Tipo",
      typeLink: "Link",
      typeText: "Texto",
      typeEmail: "E-mail",
      typeCall: "Chamada",
      fieldUrl: "URL",
      fieldText: "Texto",
      fieldEmailTo: "E-mail",
      fieldSubject: "Assunto",
      fieldMessage: "Mensagem",
      fieldPhone: "Número",
      fieldFirstName: "Nome",
      fieldLastName: "Sobrenome",
      fieldOrg: "Empresa",
      fieldJobTitle: "Cargo",
      fieldWebsite: "Site",
      fieldStreet: "Rua",
      fieldCity: "Cidade",
      fieldZip: "CEP",
      fieldCountry: "País",
      fieldSsid: "Nome da rede",
      fieldEncryption: "Criptografia",
      fieldPassword: "Senha",
      fieldHidden: "Rede oculta",
      encryptionNone: "Sem criptografia",
      fieldCountryCode: "País (DDI)",
      countryCodePlaceholder: "Selecione o país...",
      placeholderUrl: "https://seusite.com",
      placeholderText: "Seu texto aqui...",
      placeholderEmailTo: "email@exemplo.com",
      placeholderSubject: "Assunto",
      placeholderMessage: "Sua mensagem...",
      placeholderCountryCode: "+55",
      placeholderPhone: "11999999999",
      placeholderFirstName: "João",
      placeholderLastName: "Silva",
      placeholderVcardPhone: "+55 11 99999-9999",
      placeholderOrg: "Empresa Ltda.",
      placeholderJobTitle: "CEO",
      placeholderWebsite: "https://empresa.com",
      placeholderStreet: "Rua Exemplo, 123",
      placeholderCity: "São Paulo",
      placeholderZip: "01310-100",
      placeholderCountry: "BR",
      placeholderSsid: "MinhaRede",
      placeholderPassword: "Senha",
      presetLogosTitle: "Logos disponíveis",
      presetLogosButton: "Escolher logo",
      manualTitle: "Manual de uso",
      manualButtonTitle: "Manual",
    },
    status: {
      initial: "Preencha os campos e clique em Gerar QR Code.",
      dirty: "Altere os campos e gere novamente para baixar.",
      emptyContent: "Preencha o campo obrigatório para gerar o QR Code.",
      generating: "Gerando QR Code...",
      generatedSuccess: "QR Code gerado com sucesso.",
      generateBeforeDownload: "Gere o QR Code antes de baixar.",
      exportFailed: "Não foi possível exportar a imagem.",
      downloadStarted: "Download iniciado.",
      invalidImageFile: "Selecione um arquivo de imagem válido.",
      imageFormatUnsupported: "Formato da imagem não suportado.",
      imageReadFailed: "Falha ao ler a imagem.",
      logoLoadFailed: "Não foi possível carregar a logo.",
      canvasContextFailed: "Falha ao abrir o contexto do canvas.",
      invalidQrEngine: "Motor de QR Code inválido.",
      qrRenderFailed: "Falha ao gerar o QR Code.",
      qrLibraryUnavailable: "Não foi possível carregar o motor de QR Code. Verifique a conexão e recarregue a página.",
    },
    manual: {
      s1title: "Tipos de QR Code",
      s1body: "Escolha entre Link, Texto, E-mail, Chamada, WhatsApp, V-Card e Wi-Fi. Cada tipo formata automaticamente o conteúdo — basta preencher os campos exibidos.",
      s2title: "Logo",
      s2body: "Suba uma imagem do seu dispositivo ou clique em 'Escolher logo' para selecionar uma marca conhecida. Use os controles de tamanho e margem para ajustar o posicionamento.",
      s3title: "Cores",
      s3body: "Personalize a cor dos módulos do QR e do fundo. Para garantir a leitura por qualquer câmera, mantenha alto contraste entre as duas cores.",
      s4title: "Frame",
      s4body: "Ative 'Adicionar frame' para incluir uma moldura ao redor do QR com texto personalizado. Escolha as cores do frame e do texto para combinar com sua identidade visual.",
      s5title: "Gerar e Baixar",
      s5body: "Preencha os campos e clique em 'Gerar QR Code'. Após a geração, clique em 'Baixar PNG' para salvar a imagem em alta resolução (512 × 512 px).",
      s6title: "Nome do QR",
      s6body: "Adicione um nome para identificar facilmente o QR no histórico. Se deixado em branco, o conteúdo gerado é exibido no lugar.",
      s7title: "Histórico",
      s7body: "Cada QR gerado é salvo automaticamente no navegador. Você pode visualizar, clonar (restaurar configurações no painel de edição), baixar ou excluir entradas individualmente.",
      s8title: "Exportar e Importar",
      s8body: "No histórico, exporte os dados como arquivo JSON para backup ou para transferir para outro dispositivo. Importe um arquivo exportado anteriormente para restaurar o histórico.",
    },
  },
  "en-US": {
    ui: {
      badge: "studio edition · no sign-up",
      heroTitle: "Create a QR Code with a strong visual identity.",
      heroDescription:
        "Type your content, place your brand at the center, and export a production-ready PNG for print, menus, packaging, or campaigns.",
      languageLabel: "Language",
      creativeDirectionLabel: "creative direction",
      creativeDirectionTitle: "Editorial print with poster-level contrast.",
      creativeDirectionDescription: "Expressive typography, bold borders, and a textured-paper atmosphere.",
      panelBadge: "panel",
      contentLabel: "Content",
      contentPlaceholder: "https://yourwebsite.com",
      logoLabel: "Optional logo",
      logoFileDefault: "No logo selected.",
      logoSizeLabel: "Logo size",
      logoScaleSuffix: "% of QR",
      logoPaddingLabel: "White padding",
      logoPaddingSuffix: "% of QR",
      generateButtonIdle: "Generate QR Code",
      generateButtonLoading: "Generating...",
      downloadButton: "Download PNG",
      previewBadge: "preview",
      cameraTip: "Tip: use a full URL with https:// to improve scanning on camera apps.",
      footerText: "Made with luv by @yurirxmos · updated by @almeidaoffsec",
      footerBrandDescription: "Free QR Code generator with logo, frame, and local history. Maintained by @almeidaoffsec.",
      footerNavLabel: "Navigation",
      footerNavTop: "Home",
      footerNavManual: "Manual",
      footerNavHistory: "History",
      footerNavSource: "Source code",
      footerSocialLabel: "Social",
      footerStatus: "generator online",
      qrColorDarkLabel: "QR color",
      qrColorLightLabel: "Background color",
      historyPreview: "Preview",
      historyButton: "History",
      historyModalTitle: "QR Code History",
      historyEmpty: "No QR Codes generated yet.",
      historyClearButton: "Clear",
      historyDownload: "Download",
      historyDelete: "Delete",
      historyCloseButton: "Close",
      historyExportButton: "Export JSON",
      historyImportButton: "Import JSON",
      historyImportSuccess: "Imported successfully.",
      historyImportError: "Invalid file.",
      historyClone: "Clone",
      cloneNotAvailable: "This QR doesn't have enough data to clone.",
      qrNameLabel: "Name (optional)",
      qrNamePlaceholder: "e.g.: Restaurant menu",
      frameLabel: "Add frame",
      frameTextLabel: "Frame text",
      frameTextPlaceholder: "example",
      frameColorLabel: "Frame color",
      frameTextColorLabel: "Text color",
      typeLabel: "Type",
      typeLink: "Link",
      typeText: "Text",
      typeEmail: "Email",
      typeCall: "Call",
      fieldUrl: "URL",
      fieldText: "Text",
      fieldEmailTo: "Email",
      fieldSubject: "Subject",
      fieldMessage: "Message",
      fieldPhone: "Number",
      fieldFirstName: "First name",
      fieldLastName: "Last name",
      fieldOrg: "Organization",
      fieldJobTitle: "Job title",
      fieldWebsite: "Website",
      fieldStreet: "Street",
      fieldCity: "City",
      fieldZip: "ZIP",
      fieldCountry: "Country",
      fieldSsid: "Network name",
      fieldEncryption: "Encryption",
      fieldPassword: "Password",
      fieldHidden: "Hidden network",
      encryptionNone: "No encryption",
      fieldCountryCode: "Country (Code)",
      countryCodePlaceholder: "Select country...",
      placeholderUrl: "https://yourwebsite.com",
      placeholderText: "Your text here...",
      placeholderEmailTo: "email@example.com",
      placeholderSubject: "Subject",
      placeholderMessage: "Your message...",
      placeholderCountryCode: "+1",
      placeholderPhone: "5551234567",
      placeholderFirstName: "John",
      placeholderLastName: "Smith",
      placeholderVcardPhone: "+1 555 123-4567",
      placeholderOrg: "Company Inc.",
      placeholderJobTitle: "CEO",
      placeholderWebsite: "https://company.com",
      placeholderStreet: "123 Example St",
      placeholderCity: "New York",
      placeholderZip: "10001",
      placeholderCountry: "US",
      placeholderSsid: "MyNetwork",
      placeholderPassword: "Password",
      presetLogosTitle: "Available logos",
      presetLogosButton: "Choose logo",
      manualTitle: "How to use",
      manualButtonTitle: "Help",
    },
    status: {
      initial: "Fill in the fields and click Generate QR Code.",
      dirty: "Fields changed. Generate again before downloading.",
      emptyContent: "Fill in the required field to generate the QR Code.",
      generating: "Generating QR Code...",
      generatedSuccess: "QR Code generated successfully.",
      generateBeforeDownload: "Generate the QR Code before downloading.",
      exportFailed: "Could not export the image.",
      downloadStarted: "Download started.",
      invalidImageFile: "Please select a valid image file.",
      imageFormatUnsupported: "Unsupported image format.",
      imageReadFailed: "Failed to read the image.",
      logoLoadFailed: "Could not load the logo.",
      canvasContextFailed: "Could not access the canvas context.",
      invalidQrEngine: "Invalid QR Code engine.",
      qrRenderFailed: "Failed to generate the QR Code.",
      qrLibraryUnavailable: "Could not load the QR Code engine. Check your connection and reload the page.",
    },
    manual: {
      s1title: "QR Code Types",
      s1body: "Choose from Link, Text, Email, Call, WhatsApp, VCard, and Wi-Fi. Each type automatically formats the content — just fill in the displayed fields.",
      s2title: "Logo",
      s2body: "Upload an image from your device or click 'Choose logo' to pick a well-known brand. Use the size and padding sliders to adjust the positioning.",
      s3title: "Colors",
      s3body: "Customize the QR module color and the background color. For reliable scanning on any camera, maintain high contrast between both colors.",
      s4title: "Frame",
      s4body: "Enable 'Add frame' to wrap the QR with a decorative border and custom text. Choose frame and text colors to match your brand identity.",
      s5title: "Generate & Download",
      s5body: "Fill in the fields and click 'Generate QR Code'. Once generated, click 'Download PNG' to save the high-resolution image (512 × 512 px).",
      s6title: "QR Name",
      s6body: "Add a name to easily identify the QR in history. If left blank, the generated content is displayed instead.",
      s7title: "History",
      s7body: "Every generated QR is automatically saved in the browser. You can preview, clone (restore settings to the edit panel), download, or delete individual entries.",
      s8title: "Export & Import",
      s8body: "In history, export data as a JSON file for backup or cross-device transfer. Import a previously exported file to restore your history.",
    },
  },
};

const SEO_TRANSLATIONS = {
  "pt-BR": {
    title: "Free QRCode Generator | Gerador de QR Code Gratis com Logo",
    description:
      "Crie QR Code gratis online com logo central, ajuste de tamanho e download em PNG. Free QRCode Generator pronto para uso em campanhas, embalagens e cardapios.",
    ogDescription: "Crie QR Code gratis online com logo central, ajuste de tamanho e download em PNG.",
    twitterDescription: "Crie QR Code gratis online com logo central, ajuste de tamanho e download em PNG.",
    ogImageAlt: "Preview do Free QRCode Generator",
    ogLocale: "pt_BR",
  },
  "en-US": {
    title: "Free QRCode Generator | Free QR Code Generator with Logo",
    description:
      "Create a free QR Code online with an optional center logo, sizing controls, and PNG export. Ready-to-use Free QRCode Generator for campaigns, packaging, and menus.",
    ogDescription: "Create free QR Codes online with optional center logo and PNG export.",
    twitterDescription: "Create free QR Codes online with optional center logo and PNG export.",
    ogImageAlt: "Free QRCode Generator preview",
    ogLocale: "en_US",
  },
};

const CONTROL_LIST = [logoInput, logoScale, logoPadding].filter((element) => Boolean(element));
const QR_CODE_SCRIPT_SOURCES = [
  "https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.1/qrcode.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js",
];

const loadHistory = () => {
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (_error) {}
  return [];
};

const state = {
  hasGenerated: false,
  isGenerating: false,
  logoDataUrl: null,
  currentLanguage: DEFAULT_LANGUAGE,
  lastStatusKey: "initial",
  lastStatusType: "info",
  history: loadHistory(),
  qrType: "link",
};

let qrCodeLibraryPromise = null;

const getSeoPack = (language) => SEO_TRANSLATIONS[language] || SEO_TRANSLATIONS[DEFAULT_LANGUAGE];

const setMetaTagContent = (selector, content) => {
  const element = document.querySelector(selector);
  if (!element) {
    return;
  }

  element.setAttribute("content", content);
};

const setLinkHref = (selector, href) => {
  const element = document.querySelector(selector);
  if (!element) {
    return;
  }

  element.setAttribute("href", href);
};

const buildLanguageUrl = (language) => {
  const url = new URL(APP_BASE_URL);

  if (language === "en-US") {
    url.searchParams.set(LANGUAGE_QUERY_PARAM, "en-US");
  }

  return url.toString();
};

const getLanguageFromUrl = () => {
  try {
    const url = new URL(window.location.href);
    const languageParam = url.searchParams.get(LANGUAGE_QUERY_PARAM);

    if (languageParam && TRANSLATIONS[languageParam]) {
      return languageParam;
    }
  } catch (_error) {}

  return null;
};

const updateLanguageInUrl = (language) => {
  try {
    const url = new URL(window.location.href);

    if (language === DEFAULT_LANGUAGE) {
      url.searchParams.delete(LANGUAGE_QUERY_PARAM);
    } else {
      url.searchParams.set(LANGUAGE_QUERY_PARAM, language);
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState({}, "", nextUrl);
  } catch (_error) {}
};

const applySeoMetadata = (language) => {
  const seo = getSeoPack(language);
  const localizedUrl = buildLanguageUrl(language);

  document.title = seo.title;

  setMetaTagContent('meta[name="description"]', seo.description);
  setMetaTagContent('meta[property="og:title"]', seo.title);
  setMetaTagContent('meta[property="og:description"]', seo.ogDescription);
  setMetaTagContent('meta[property="og:url"]', localizedUrl);
  setMetaTagContent('meta[property="og:locale"]', seo.ogLocale);
  setMetaTagContent('meta[property="og:image:alt"]', seo.ogImageAlt);
  setMetaTagContent('meta[name="twitter:title"]', seo.title);
  setMetaTagContent('meta[name="twitter:description"]', seo.twitterDescription);

  setLinkHref('link[rel="canonical"]', localizedUrl);
  setLinkHref('link[rel="alternate"][hreflang="pt-BR"]', buildLanguageUrl("pt-BR"));
  setLinkHref('link[rel="alternate"][hreflang="en-US"]', buildLanguageUrl("en-US"));
  setLinkHref('link[rel="alternate"][hreflang="x-default"]', buildLanguageUrl("pt-BR"));
};

const getLanguagePack = (language) => TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];

const t = (section, key) => {
  const currentPack = getLanguagePack(state.currentLanguage);
  const defaultPack = getLanguagePack(DEFAULT_LANGUAGE);
  return currentPack[section]?.[key] || defaultPack[section]?.[key] || "";
};

const createI18nError = (statusKey) => new Error(`i18n:${statusKey}`);

const getStatusKeyFromError = (error, fallbackKey) => {
  if (!(error instanceof Error)) {
    return fallbackKey;
  }

  if (!error.message.startsWith("i18n:")) {
    return fallbackKey;
  }

  return error.message.replace("i18n:", "");
};

const renderStatus = () => {
  const styleClass = STATUS_STYLE_MAP[state.lastStatusType] || STATUS_STYLE_MAP.info;
  statusMessage.textContent = t("status", state.lastStatusKey);
  statusMessage.className = `min-h-12 rounded-lg px-3 py-2 text-sm font-medium transition ${styleClass}`;
};

const setStatus = (statusKey, statusType = "info") => {
  state.lastStatusKey = statusKey;
  state.lastStatusType = statusType;
  renderStatus();
};

const updateGenerateButtonLabel = () => {
  if (!generateButtonLabel) {
    return;
  }

  const labelKey = state.isGenerating ? "generateButtonLoading" : "generateButtonIdle";
  generateButtonLabel.textContent = t("ui", labelKey);
};

const updateLogoFileNameText = () => {
  if (!logoInput.files || logoInput.files.length === 0) {
    logoFileName.textContent = t("ui", "logoFileDefault");
  }
};

const applyLanguage = (language) => {
  const normalizedLanguage = TRANSLATIONS[language] ? language : DEFAULT_LANGUAGE;
  state.currentLanguage = normalizedLanguage;

  document.documentElement.lang = normalizedLanguage;

  languageButtons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const isActive = button.dataset.languageButton === normalizedLanguage;
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
    button.classList.toggle("lang-btn-active", isActive);
  });

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (!key) {
      return;
    }

    element.textContent = t("ui", key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (!key || !(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
      return;
    }

    element.placeholder = t("ui", key);
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.dataset.i18nTitle;
    if (!key) return;
    element.title = t("ui", key);
    element.setAttribute("aria-label", t("ui", key));
  });

  if (logoScaleSuffix) {
    logoScaleSuffix.textContent = t("ui", "logoScaleSuffix");
  }

  if (logoPaddingSuffix) {
    logoPaddingSuffix.textContent = t("ui", "logoPaddingSuffix");
  }

  updateGenerateButtonLabel();
  updateLogoFileNameText();
  renderStatus();
  applySeoMetadata(normalizedLanguage);
  updateLanguageInUrl(normalizedLanguage);

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage);
  } catch (_error) {}

  renderHistoryList();
  if (manualModal && !manualModal.classList.contains("hidden")) renderManualContent();
};

const getInitialLanguage = () => {
  const languageFromUrl = getLanguageFromUrl();
  if (languageFromUrl) {
    return languageFromUrl;
  }

  try {
    const persistedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (persistedLanguage && TRANSLATIONS[persistedLanguage]) {
      return persistedLanguage;
    }
  } catch (_error) {}

  if (navigator.language.toLowerCase().startsWith("en")) {
    return "en-US";
  }

  return DEFAULT_LANGUAGE;
};

const setGeneratingState = (isGenerating) => {
  state.isGenerating = isGenerating;
  generateButton.disabled = isGenerating;
  downloadButton.disabled = isGenerating || !state.hasGenerated;
  updateGenerateButtonLabel();
};

const animatePreviewFrame = () => {
  if (!previewFrame) {
    return;
  }

  previewFrame.classList.add("scale-[1.02]");

  window.setTimeout(() => {
    previewFrame.classList.remove("scale-[1.02]");
  }, 180);
};

const setDirtyState = () => {
  if (!state.hasGenerated) {
    return;
  }

  state.hasGenerated = false;
  downloadButton.disabled = true;
  setStatus("dirty");
};

const getContrastColor = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? "#000000" : "#ffffff";
};

const drawRoundedRectTopOnly = (ctx, x, y, w, h, r) => {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

const drawRoundedRect = (context, x, y, width, height, radius) => {
  const normalizedRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + normalizedRadius, y);
  context.lineTo(x + width - normalizedRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + normalizedRadius);
  context.lineTo(x + width, y + height - normalizedRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - normalizedRadius, y + height);
  context.lineTo(x + normalizedRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - normalizedRadius);
  context.lineTo(x, y + normalizedRadius);
  context.quadraticCurveTo(x, y, x + normalizedRadius, y);
  context.closePath();
};

const loadExternalScript = (source) =>
  new Promise((resolve, reject) => {
    const hasSourceScript = Boolean(document.querySelector(`script[src="${source}"]`));
    const sourceWithRetry = hasSourceScript
      ? `${source}${source.includes("?") ? "&" : "?"}cacheBust=${Date.now()}`
      : source;

    const script = document.createElement("script");
    script.src = sourceWithRetry;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(createI18nError("qrLibraryUnavailable"));
    document.head.append(script);
  });

const loadImage = async (source) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(createI18nError("logoLoadFailed"));
    image.src = source;
  });

const renderQrCodeWithLegacyApi = async ({ canvas, text, size, darkColor, lightColor }) => {
  const context = canvas.getContext("2d");
  if (!context) {
    throw createI18nError("canvasContextFailed");
  }

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  container.style.pointerEvents = "none";

  document.body.append(container);

  try {
    const legacyQrCode = window.QRCode;
    if (typeof legacyQrCode !== "function") {
      throw createI18nError("invalidQrEngine");
    }

    new legacyQrCode(container, {
      text,
      width: size,
      height: size,
      colorDark: darkColor,
      colorLight: lightColor,
      correctLevel: legacyQrCode.CorrectLevel?.H,
    });

    await new Promise((resolve) => {
      window.setTimeout(resolve, 24);
    });

    const generatedCanvas = container.querySelector("canvas");
    if (generatedCanvas) {
      context.clearRect(0, 0, size, size);
      context.drawImage(generatedCanvas, 0, 0, size, size);
      return;
    }

    const generatedImage = container.querySelector("img");
    if (generatedImage && generatedImage.src) {
      const image = await loadImage(generatedImage.src);
      context.clearRect(0, 0, size, size);
      context.drawImage(image, 0, 0, size, size);
      return;
    }

    throw createI18nError("qrRenderFailed");
  } finally {
    container.remove();
  }
};

const getQrCodeRenderer = () => {
  if (window.QRCode && typeof window.QRCode.toCanvas === "function") {
    return {
      render: async ({ canvas, text, size, darkColor, lightColor }) => {
        await window.QRCode.toCanvas(canvas, text, {
          width: size,
          margin: 1,
          errorCorrectionLevel: "H",
          color: {
            dark: darkColor,
            light: lightColor,
          },
        });
      },
    };
  }

  if (typeof window.QRCode === "function") {
    return {
      render: renderQrCodeWithLegacyApi,
    };
  }

  return null;
};

const ensureQrCodeLibrary = async () => {
  const currentRenderer = getQrCodeRenderer();
  if (currentRenderer) {
    return currentRenderer;
  }

  if (qrCodeLibraryPromise) {
    return qrCodeLibraryPromise;
  }

  qrCodeLibraryPromise = (async () => {
    for (const source of QR_CODE_SCRIPT_SOURCES) {
      try {
        await loadExternalScript(source);
      } catch (_error) {
        continue;
      }

      const renderer = getQrCodeRenderer();
      if (renderer) {
        return renderer;
      }
    }

    throw createI18nError("qrLibraryUnavailable");
  })();

  try {
    return await qrCodeLibraryPromise;
  } catch (error) {
    qrCodeLibraryPromise = null;
    throw error;
  }
};

const drawLogoOnCanvas = async ({ canvas, dataUrl, scalePercent, paddingPercent }) => {
  const context = canvas.getContext("2d");
  if (!context) {
    throw createI18nError("canvasContextFailed");
  }

  const image = await loadImage(dataUrl);
  const logoSize = Math.floor((canvas.width * scalePercent) / 100);
  const paddingSize = Math.floor((canvas.width * paddingPercent) / 100);
  const backgroundSize = logoSize + paddingSize * 2;
  const centerX = Math.floor(canvas.width / 2);
  const centerY = Math.floor(canvas.height / 2);
  const backgroundX = Math.floor(centerX - backgroundSize / 2);
  const backgroundY = Math.floor(centerY - backgroundSize / 2);
  const logoX = Math.floor(centerX - logoSize / 2);
  const logoY = Math.floor(centerY - logoSize / 2);

  context.save();
  context.fillStyle = "#ffffff";
  drawRoundedRect(context, backgroundX, backgroundY, backgroundSize, backgroundSize, Math.floor(backgroundSize * 0.2));
  context.fill();
  context.restore();

  context.save();
  drawRoundedRect(context, logoX, logoY, logoSize, logoSize, Math.floor(logoSize * 0.18));
  context.clip();
  context.drawImage(image, logoX, logoY, logoSize, logoSize);
  context.restore();
};

const updateTextCharCounter = () => {
  const textarea = document.getElementById("qrField-text-content");
  if (!textarea || !textCharCounter) return;

  const count = textarea.value.length;
  const ratio = count / QR_TEXT_MAX_CHARS;

  textCharCounter.textContent = `${count}/${QR_TEXT_MAX_CHARS}`;
  textCharCounter.className = `text-xs text-right tabular-nums ${
    ratio >= 1 ? "text-[#FF4D6D] font-medium" : ratio >= 0.8 ? "text-[#FFB347]" : "text-[#4A5568]"
  }`;
};

const captureFieldValues = (type) => {
  const getVal = (id) => document.getElementById(id)?.value ?? "";
  const fields = {};

  switch (type) {
    case "link":
      fields["qrField-link-url"] = getVal("qrField-link-url");
      break;
    case "text":
      fields["qrField-text-content"] = getVal("qrField-text-content");
      break;
    case "email":
      ["to", "subject", "body"].forEach((f) => {
        fields[`qrField-email-${f}`] = getVal(`qrField-email-${f}`);
      });
      break;
    case "call":
      fields["qrField-call-code"] = getVal("qrField-call-code");
      fields["qrField-call-number"] = getVal("qrField-call-number");
      break;
    case "whatsapp":
      fields["qrField-whatsapp-code"] = getVal("qrField-whatsapp-code");
      fields["qrField-whatsapp-number"] = getVal("qrField-whatsapp-number");
      fields["qrField-whatsapp-message"] = getVal("qrField-whatsapp-message");
      break;
    case "vcard":
      ["firstname", "lastname", "phone-code", "phone-number", "email", "org", "jobtitle", "url", "street", "city", "zip", "country"].forEach((f) => {
        fields[`qrField-vcard-${f}`] = getVal(`qrField-vcard-${f}`);
      });
      break;
    case "wifi":
      fields["qrField-wifi-ssid"] = getVal("qrField-wifi-ssid");
      fields["qrField-wifi-encryption"] = getVal("qrField-wifi-encryption");
      fields["qrField-wifi-password"] = getVal("qrField-wifi-password");
      fields["qrField-wifi-hidden"] = document.getElementById("qrField-wifi-hidden")?.checked ?? false;
      break;
  }

  return fields;
};

const restoreFromSnapshot = (snapshot) => {
  if (!snapshot) {
    setStatus("cloneNotAvailable", "info");
    return;
  }

  setQrType(snapshot.type || "link");

  Object.entries(snapshot.fields || {}).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el instanceof HTMLInputElement && el.type === "checkbox") {
      el.checked = Boolean(value);
    } else {
      el.value = value;
    }
  });

  if (snapshot.type === "text") updateTextCharCounter();

  if (snapshot.type === "wifi") {
    const enc = document.getElementById("qrField-wifi-encryption");
    const pwGroup = document.getElementById("wifiPasswordGroup");
    if (enc && pwGroup) pwGroup.classList.toggle("hidden", enc.value === "nopass");
  }

  if (snapshot.colors) {
    if (qrColorDark) qrColorDark.value = snapshot.colors.dark || "#0f172a";
    if (qrColorLight) qrColorLight.value = snapshot.colors.light || "#ffffff";
  }

  if (snapshot.logoScale !== undefined) {
    logoScale.value = snapshot.logoScale;
    logoScaleValue.textContent = snapshot.logoScale;
  }
  if (snapshot.logoPadding !== undefined) {
    logoPadding.value = snapshot.logoPadding;
    logoPaddingValue.textContent = snapshot.logoPadding;
  }

  if (qrNameInput) qrNameInput.value = snapshot.name || "";

  if (frameEnabledInput && snapshot.frame) {
    frameEnabledInput.checked = snapshot.frame.enabled || false;
    frameOptions?.classList.toggle("hidden", !frameEnabledInput.checked);
    if (frameTextInput) frameTextInput.value = snapshot.frame.text || "";
    if (frameColorInput) frameColorInput.value = snapshot.frame.color || "#000000";
    if (frameTextColorInput) frameTextColorInput.value = snapshot.frame.textColor || "#ffffff";
  }

  state.hasGenerated = false;
  downloadButton.disabled = true;
  setStatus("initial");

  closeHistoryModal();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const drawFrame = (canvas, text, frameColor, textColor) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw createI18nError("canvasContextFailed");

  const qrW = canvas.width;
  const qrH = canvas.height;

  const offscreen = document.createElement("canvas");
  offscreen.width = qrW;
  offscreen.height = qrH;
  offscreen.getContext("2d").drawImage(canvas, 0, 0);

  const newW = qrW + FRAME_SIDE * 2;
  const newH = qrH + FRAME_TOP + FRAME_BOTTOM;
  canvas.width = newW;
  canvas.height = newH;

  ctx.fillStyle = frameColor;
  drawRoundedRect(ctx, 0, 0, newW, newH, FRAME_OUTER_R);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  drawRoundedRectTopOnly(ctx, FRAME_SIDE, FRAME_TOP, qrW, qrH, FRAME_INNER_R);
  ctx.fill();

  ctx.drawImage(offscreen, FRAME_SIDE, FRAME_TOP);

  if (text) {
    ctx.fillStyle = textColor || getContrastColor(frameColor);
    ctx.font = `600 ${FRAME_FONT_SIZE}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, newW / 2, qrH + FRAME_TOP + FRAME_BOTTOM / 2, newW - FRAME_SIDE * 2);
  }
};

const getTypeLabel = (type) => {
  const key = `type${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  return t("ui", key) || type;
};

const getFieldValue = (id) => document.getElementById(id)?.value?.trim() ?? "";

const buildQrContent = () => {
  const type = state.qrType;

  switch (type) {
    case "link":
      return getFieldValue("qrField-link-url");

    case "text":
      return getFieldValue("qrField-text-content");

    case "email": {
      const to = getFieldValue("qrField-email-to");
      const subject = getFieldValue("qrField-email-subject");
      const body = getFieldValue("qrField-email-body");
      let url = `mailto:${to}`;
      const params = [];
      if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
      if (body) params.push(`body=${encodeURIComponent(body)}`);
      if (params.length) url += `?${params.join("&")}`;
      return url;
    }

    case "call": {
      const code = document.getElementById("qrField-call-code")?.value ?? "";
      const number = getFieldValue("qrField-call-number").replace(/\D/g, "");
      return `tel:${code ? `+${code}${number}` : number}`;
    }

    case "whatsapp": {
      const code = document.getElementById("qrField-whatsapp-code")?.value ?? "";
      const number = getFieldValue("qrField-whatsapp-number").replace(/\D/g, "");
      const message = getFieldValue("qrField-whatsapp-message");
      let url = `https://wa.me/${code}${number}`;
      if (message) url += `?text=${encodeURIComponent(message)}`;
      return url;
    }

    case "vcard": {
      const firstName = getFieldValue("qrField-vcard-firstname");
      const lastName = getFieldValue("qrField-vcard-lastname");
      const phoneCode = document.getElementById("qrField-vcard-phone-code")?.value ?? "";
      const phoneNumber = getFieldValue("qrField-vcard-phone-number").replace(/\D/g, "");
      const phone = phoneNumber ? (phoneCode ? `+${phoneCode}${phoneNumber}` : phoneNumber) : "";
      const email = getFieldValue("qrField-vcard-email");
      const org = getFieldValue("qrField-vcard-org");
      const jobTitle = getFieldValue("qrField-vcard-jobtitle");
      const url = getFieldValue("qrField-vcard-url");
      const street = getFieldValue("qrField-vcard-street");
      const city = getFieldValue("qrField-vcard-city");
      const zip = getFieldValue("qrField-vcard-zip");
      const country = getFieldValue("qrField-vcard-country");

      const lines = ["BEGIN:VCARD", "VERSION:3.0"];
      lines.push(`N:${lastName};${firstName};;;`);
      const fullName = [firstName, lastName].filter(Boolean).join(" ");
      if (fullName) lines.push(`FN:${fullName}`);
      if (phone) lines.push(`TEL:${phone}`);
      if (email) lines.push(`EMAIL:${email}`);
      if (org) lines.push(`ORG:${org}`);
      if (jobTitle) lines.push(`TITLE:${jobTitle}`);
      if (url) lines.push(`URL:${url}`);
      if (street || city || zip || country) lines.push(`ADR:;;${street};${city};;${zip};${country}`);
      lines.push("END:VCARD");
      return lines.join("\n");
    }

    case "wifi": {
      const ssid = getFieldValue("qrField-wifi-ssid");
      const encryption = document.getElementById("qrField-wifi-encryption")?.value ?? "WPA";
      const password = getFieldValue("qrField-wifi-password");
      const hidden = document.getElementById("qrField-wifi-hidden")?.checked ?? false;
      const esc = (s) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/"/g, '\\"');
      if (encryption === "nopass") return `WIFI:T:nopass;S:${esc(ssid)};H:${hidden};;`;
      return `WIFI:T:${encryption};S:${esc(ssid)};P:${esc(password)};H:${hidden};;`;
    }

    default:
      return "";
  }
};

const setQrType = (type) => {
  state.qrType = type;

  document.querySelectorAll(".qr-type-tab").forEach((button) => {
    const isActive = button.dataset.qrType === type;
    button.classList.toggle("tab-active", isActive);
    button.classList.toggle("tab-inactive", !isActive);
  });

  document.querySelectorAll(".qr-type-panel").forEach((panel) => {
    panel.classList.toggle("hidden", panel.id !== `qrTypePanel-${type}`);
  });

  setDirtyState();
};

const generateQrCode = async () => {
  const primaryId = QR_TYPE_PRIMARY_FIELD[state.qrType];
  const primaryEl = document.getElementById(primaryId);
  if (!primaryEl || !primaryEl.value.trim()) {
    setStatus("emptyContent", "error");
    return;
  }

  const contentValue = buildQrContent();
  if (!contentValue) {
    setStatus("emptyContent", "error");
    return;
  }

  const sizeValue = DEFAULT_QR_SIZE;
  const scalePercent = Number(logoScale.value);
  const paddingPercent = Number(logoPadding.value);

  setGeneratingState(true);
  setStatus("generating");

  try {
    const qrCodeRenderer = await ensureQrCodeLibrary();

    qrCanvas.width = sizeValue;
    qrCanvas.height = sizeValue;

    await qrCodeRenderer.render({
      canvas: qrCanvas,
      text: contentValue,
      size: sizeValue,
      darkColor: qrColorDark.value,
      lightColor: qrColorLight.value,
    });

    if (state.logoDataUrl) {
      await drawLogoOnCanvas({
        canvas: qrCanvas,
        dataUrl: state.logoDataUrl,
        scalePercent,
        paddingPercent,
      });
    }

    if (frameEnabledInput?.checked) {
      drawFrame(
        qrCanvas,
        frameTextInput?.value?.trim() ?? "",
        frameColorInput?.value ?? "#000000",
        frameTextColorInput?.value || null
      );
    }

    state.hasGenerated = true;
    addToHistory({
      id: Date.now(),
      content: contentValue,
      type: state.qrType,
      name: qrNameInput?.value?.trim() || "",
      dataUrl: qrCanvas.toDataURL("image/png"),
      fileName: getDownloadFileName(),
      snapshot: {
        type: state.qrType,
        name: qrNameInput?.value?.trim() || "",
        fields: captureFieldValues(state.qrType),
        colors: { dark: qrColorDark.value, light: qrColorLight.value },
        logoScale: logoScale.value,
        logoPadding: logoPadding.value,
        frame: {
          enabled: frameEnabledInput?.checked || false,
          text: frameTextInput?.value?.trim() || "",
          color: frameColorInput?.value || "#000000",
          textColor: frameTextColorInput?.value || "",
        },
      },
    });
    animatePreviewFrame();
    setStatus("generatedSuccess", "success");
  } catch (error) {
    const statusKey = getStatusKeyFromError(error, "qrRenderFailed");
    setStatus(statusKey, "error");
    state.hasGenerated = false;
  } finally {
    setGeneratingState(false);
  }
};

const getDownloadFileName = () => (state.currentLanguage === "en-US" ? "qrcode-with-logo.png" : "qrcode-com-logo.png");

const downloadQrCode = () => {
  if (!state.hasGenerated) {
    setStatus("generateBeforeDownload", "error");
    return;
  }

  qrCanvas.toBlob((blob) => {
    if (!blob) {
      setStatus("exportFailed", "error");
      return;
    }

    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = getDownloadFileName();
    link.click();
    URL.revokeObjectURL(fileUrl);

    setStatus("downloadStarted", "success");
  }, "image/png");
};

const handleLogoChange = async () => {
  const [file] = logoInput.files || [];

  if (!file) {
    state.logoDataUrl = null;
    logoFileName.textContent = t("ui", "logoFileDefault");
    setDirtyState();
    return;
  }

  if (!file.type.startsWith("image/")) {
    state.logoDataUrl = null;
    logoInput.value = "";
    logoFileName.textContent = t("ui", "logoFileDefault");
    setStatus("invalidImageFile", "error");
    setDirtyState();
    return;
  }

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(createI18nError("imageFormatUnsupported"));
    };
    reader.onerror = () => reject(createI18nError("imageReadFailed"));
    reader.readAsDataURL(file);
  }).catch((error) => {
    const statusKey = getStatusKeyFromError(error, "imageReadFailed");
    setStatus(statusKey, "error");
    return null;
  });

  if (!dataUrl) {
    return;
  }

  state.logoDataUrl = dataUrl;
  logoFileName.textContent = file.name;
  setDirtyState();
};

const saveHistory = () => {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(state.history));
  } catch (_error) {
    setStatus("exportFailed", "error");
  }
};

const addToHistory = (entry) => {
  state.history.push(entry);
  saveHistory();
  renderHistoryList();
};

const clearHistory = () => {
  state.history = [];
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (_error) {}
  renderHistoryList();
};

const downloadHistoryItem = (dataUrl, fileName) => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  link.click();
};

const deleteHistoryItem = (id) => {
  state.history = state.history.filter((entry) => entry.id !== id);
  saveHistory();
  renderHistoryList();
};

const getHistoryExportFileName = () =>
  state.currentLanguage === "en-US" ? "qrcode-history.json" : "historico-qrcode.json";

const exportHistory = () => {
  const blob = new Blob([JSON.stringify(state.history, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = getHistoryExportFileName();
  link.click();
  URL.revokeObjectURL(url);
};

let historyStatusTimer = null;

const showHistoryModalStatus = (messageKey, isError = false) => {
  if (!historyModalStatus) {
    return;
  }
  historyModalStatus.textContent = t("ui", messageKey);
  historyModalStatus.className = `text-xs ${isError ? "text-[#FF4D6D]" : "text-[#39D353]"}`;
  clearTimeout(historyStatusTimer);
  historyStatusTimer = window.setTimeout(() => {
    if (historyModalStatus) {
      historyModalStatus.textContent = "";
    }
  }, 3000);
};

const importHistory = (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!Array.isArray(parsed)) {
        showHistoryModalStatus("historyImportError", true);
        return;
      }
      const validEntries = parsed.filter(
        (entry) =>
          entry &&
          typeof entry.id === "number" &&
          typeof entry.content === "string" &&
          typeof entry.dataUrl === "string" &&
          typeof entry.fileName === "string"
      );
      const existingIds = new Set(state.history.map((e) => e.id));
      const newEntries = validEntries.filter((e) => !existingIds.has(e.id));
      state.history = [...state.history, ...newEntries];
      saveHistory();
      renderHistoryList();
      showHistoryModalStatus("historyImportSuccess");
    } catch (_error) {
      showHistoryModalStatus("historyImportError", true);
    }
  };
  reader.onerror = () => showHistoryModalStatus("historyImportError", true);
  reader.readAsText(file);
};

const renderHistoryList = () => {
  if (!historyList) {
    return;
  }

  historyList.innerHTML = "";

  if (state.history.length === 0) {
    const emptyEl = document.createElement("p");
    emptyEl.textContent = t("ui", "historyEmpty");
    emptyEl.className = "py-8 text-center text-sm text-[#4A5568]";
    historyList.append(emptyEl);
    return;
  }

  [...state.history].reverse().forEach((entry) => {
    const wrapper = document.createElement("div");
    wrapper.className = "history-item-wrapper";

    const row = document.createElement("div");
    row.className = "flex items-center gap-3";

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "min-w-0 flex-1 flex items-center gap-1.5 overflow-hidden";

    const typeBadge = document.createElement("span");
    typeBadge.textContent = getTypeLabel(entry.type || "link");
    typeBadge.className = "type-badge";

    const contentEl = document.createElement("p");
    contentEl.textContent = entry.name || entry.content;
    contentEl.className = "min-w-0 truncate text-sm text-[#8A96A8]";

    contentWrapper.append(typeBadge, contentEl);

    const previewBtn = document.createElement("button");
    previewBtn.textContent = t("ui", "historyPreview");
    previewBtn.type = "button";
    previewBtn.className = "history-btn";

    const previewPanel = document.createElement("div");
    previewPanel.className = "hidden mt-3";
    const previewImg = document.createElement("img");
    previewImg.src = entry.dataUrl;
    previewImg.alt = entry.content;
    previewImg.className = "history-preview-img";
    previewPanel.append(previewImg);

    previewBtn.addEventListener("click", () => {
      previewPanel.classList.toggle("hidden");
    });

    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = t("ui", "historyDownload");
    downloadBtn.type = "button";
    downloadBtn.className = "history-btn";
    downloadBtn.addEventListener("click", () => downloadHistoryItem(entry.dataUrl, entry.fileName));

    const cloneBtn = document.createElement("button");
    cloneBtn.textContent = t("ui", "historyClone");
    cloneBtn.type = "button";
    cloneBtn.className = "history-btn";
    cloneBtn.addEventListener("click", () => restoreFromSnapshot(entry.snapshot));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = t("ui", "historyDelete");
    deleteBtn.type = "button";
    deleteBtn.className = "history-delete-btn";
    deleteBtn.addEventListener("click", () => deleteHistoryItem(entry.id));

    row.append(contentWrapper, previewBtn, cloneBtn, downloadBtn, deleteBtn);
    wrapper.append(row, previewPanel);
    historyList.append(wrapper);
  });
};

const openHistoryModal = () => {
  renderHistoryList();
  historyModal.classList.remove("hidden");
  historyModal.classList.add("flex");
};

const closeHistoryModal = () => {
  historyModal.classList.remove("flex");
  historyModal.classList.add("hidden");
};

const renderManualContent = () => {
  const container = document.getElementById("manualContent");
  if (!container) return;

  container.innerHTML = "";

  MANUAL_SECTIONS.forEach(([titleKey, bodyKey]) => {
    const section = document.createElement("div");
    section.className = "manual-section";

    const h3 = document.createElement("h3");
    h3.textContent = t("manual", titleKey);
    h3.className = "mb-1 text-sm font-semibold text-[#EAECF0]";

    const p = document.createElement("p");
    p.textContent = t("manual", bodyKey);
    p.className = "text-sm leading-relaxed text-[#8A96A8]";

    section.append(h3, p);
    container.append(section);
  });
};

const openManualModal = () => {
  if (!manualModal) return;
  renderManualContent();
  manualModal.classList.remove("hidden");
  manualModal.classList.add("flex");
};

const closeManualModal = () => {
  if (!manualModal) return;
  manualModal.classList.remove("flex");
  manualModal.classList.add("hidden");
};

const openPresetLogosModal = () => {
  if (!presetLogosModal) return;
  renderPresetLogosList();
  presetLogosModal.classList.remove("hidden");
  presetLogosModal.classList.add("flex");
};

const closePresetLogosModal = () => {
  if (!presetLogosModal) return;
  presetLogosModal.classList.remove("flex");
  presetLogosModal.classList.add("hidden");
};

const selectPresetLogo = async (file, name) => {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error("fetch failed");
    const blob = await response.blob();
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    state.logoDataUrl = dataUrl;
    logoFileName.textContent = name;
    setDirtyState();
    closePresetLogosModal();
  } catch (_error) {
    setStatus("logoLoadFailed", "error");
  }
};

const renderPresetLogosList = () => {
  const list = document.getElementById("presetLogosList");
  if (!list) return;

  list.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-4 gap-3";

  PRESET_LOGOS.forEach(({ name, file }) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "preset-logo-btn";
    btn.addEventListener("click", () => selectPresetLogo(file, name));

    const img = document.createElement("img");
    img.src = file;
    img.alt = name;
    img.className = "h-10 w-10 rounded-lg object-contain";

    const label = document.createElement("span");
    label.textContent = name;
    label.className = "preset-logo-label";

    btn.append(img, label);
    grid.append(btn);
  });

  list.append(grid);
};

generateButton.addEventListener("click", generateQrCode);
downloadButton.addEventListener("click", downloadQrCode);
logoInput.addEventListener("change", handleLogoChange);

languageButtons.forEach((button) => {
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  button.addEventListener("click", () => {
    const selectedLanguage = button.dataset.languageButton;
    if (!selectedLanguage) {
      return;
    }

    applyLanguage(selectedLanguage);
    closeHeaderMenu();
  });
});

logoScale.addEventListener("input", () => {
  logoScaleValue.textContent = logoScale.value;
  setDirtyState();
});

logoPadding.addEventListener("input", () => {
  logoPaddingValue.textContent = logoPadding.value;
  setDirtyState();
});

CONTROL_LIST.forEach((element) => {
  if (element === logoInput || element === logoScale || element === logoPadding) {
    return;
  }

  element.addEventListener("input", setDirtyState);
  element.addEventListener("change", setDirtyState);
});

qrColorDark.addEventListener("input", setDirtyState);
qrColorLight.addEventListener("input", setDirtyState);

if (historyButton) {
  historyButton.addEventListener("click", openHistoryModal);
}

if (clearHistoryButton) {
  clearHistoryButton.addEventListener("click", clearHistory);
}

if (closeHistoryButton) {
  closeHistoryButton.addEventListener("click", closeHistoryModal);
}

if (historyModal) {
  historyModal.addEventListener("click", (event) => {
    if (event.target === historyModal) {
      closeHistoryModal();
    }
  });
}

if (exportHistoryButton) {
  exportHistoryButton.addEventListener("click", exportHistory);
}

if (importHistoryButton) {
  importHistoryButton.addEventListener("click", () => {
    if (importFileInput) {
      importFileInput.value = "";
      importFileInput.click();
    }
  });
}

if (importFileInput) {
  importFileInput.addEventListener("change", () => {
    const [file] = importFileInput.files || [];
    if (file) {
      importHistory(file);
    }
  });
}

document.querySelectorAll(".qr-type-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.qrType;
    if (type) setQrType(type);
  });
});

document.querySelectorAll("[id^='qrField-']").forEach((el) => {
  if (el instanceof HTMLInputElement && el.type === "checkbox") {
    el.addEventListener("change", setDirtyState);
  } else if (el instanceof HTMLSelectElement) {
    el.addEventListener("change", setDirtyState);
  } else {
    el.addEventListener("input", setDirtyState);
  }
});

document.getElementById("qrField-text-content")?.addEventListener("input", updateTextCharCounter);

const frameTextCharCounter = document.getElementById("frameTextCharCounter");
const updateFrameTextCharCounter = () => {
  if (!frameTextCharCounter || !frameTextInput) return;
  const count = frameTextInput.value.length;
  frameTextCharCounter.textContent = `${count}/50`;
  frameTextCharCounter.className = `text-xs text-right tabular-nums ${count >= 50 ? "text-[#FF4D6D] font-medium" : count >= 40 ? "text-[#FFB347]" : "text-[#4A5568]"}`;
};

frameTextInput?.addEventListener("input", updateFrameTextCharCounter);

if (frameEnabledInput) {
  frameEnabledInput.addEventListener("change", () => {
    frameOptions?.classList.toggle("hidden", !frameEnabledInput.checked);
    setDirtyState();
  });
}

[frameTextInput, frameColorInput, frameTextColorInput].forEach((el) => {
  el?.addEventListener("input", setDirtyState);
});

const wifiEncryptionEl = document.getElementById("qrField-wifi-encryption");
const wifiPasswordGroup = document.getElementById("wifiPasswordGroup");
if (wifiEncryptionEl && wifiPasswordGroup) {
  wifiEncryptionEl.addEventListener("change", () => {
    wifiPasswordGroup.classList.toggle("hidden", wifiEncryptionEl.value === "nopass");
  });
}

const populateCountryCodeSelects = () => {
  const ids = ["qrField-call-code", "qrField-whatsapp-code", "qrField-vcard-phone-code"];
  const placeholder = t("ui", "countryCodePlaceholder");

  ids.forEach((id) => {
    const select = document.getElementById(id);
    if (!select) return;

    const prev = select.value;
    select.innerHTML = "";

    const ph = document.createElement("option");
    ph.value = "";
    ph.textContent = placeholder;
    ph.disabled = true;
    select.append(ph);

    COUNTRY_CODES.forEach(([name, code]) => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = `${name} (+${code})`;
      select.append(opt);
    });

    select.value = prev && select.querySelector(`option[value="${prev}"]`) ? prev : "55";
  });
};

const closeHeaderMenu = () => {
  if (!headerMenuPanel || !headerMenuToggle) {
    return;
  }
  headerMenuPanel.classList.add("hidden");
  headerMenuToggle.setAttribute("aria-expanded", "false");
};

if (headerMenuToggle && headerMenuPanel) {
  headerMenuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = !headerMenuPanel.classList.contains("hidden");
    headerMenuPanel.classList.toggle("hidden", isOpen);
    headerMenuToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
  });

  document.addEventListener("click", (event) => {
    if (
      !headerMenuPanel.contains(event.target) &&
      !headerMenuToggle.contains(event.target)
    ) {
      closeHeaderMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeHeaderMenu();
    }
  });
}

if (manualButton) {
  manualButton.addEventListener("click", () => {
    openManualModal();
    closeHeaderMenu();
  });
}

if (closeManualButton) {
  closeManualButton.addEventListener("click", closeManualModal);
}

if (footerManualButton) {
  footerManualButton.addEventListener("click", openManualModal);
}

if (footerHistoryButton) {
  footerHistoryButton.addEventListener("click", openHistoryModal);
}

if (manualModal) {
  manualModal.addEventListener("click", (event) => {
    if (event.target === manualModal) closeManualModal();
  });
}

if (presetLogosButton) {
  presetLogosButton.addEventListener("click", openPresetLogosModal);
}

if (closePresetLogosButton) {
  closePresetLogosButton.addEventListener("click", closePresetLogosModal);
}

if (presetLogosModal) {
  presetLogosModal.addEventListener("click", (event) => {
    if (event.target === presetLogosModal) closePresetLogosModal();
  });
}

applyLanguage(getInitialLanguage());
populateCountryCodeSelects();
setQrType(state.qrType);
