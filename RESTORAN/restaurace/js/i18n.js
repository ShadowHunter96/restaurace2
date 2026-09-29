(function () {
    "use strict";

    var LANGS = ["cs", "en", "vi", "zh", "de", "ru", "es"];
    var STORAGE_KEY = "lang";

    // Klíč = český text ze stránky (mezery se normalizují). Nové texty stačí přidat sem.
    var DICT = {
        "Domů": { en: "Home", vi: "Trang chủ", zh: "首页", de: "Startseite", ru: "Главная", es: "Inicio" },
        "O nás": { en: "About us", vi: "Về chúng tôi", zh: "关于我们", de: "Über uns", ru: "О нас", es: "Sobre nosotros" },
        "Menu": { en: "Menu", vi: "Thực đơn", zh: "菜单", de: "Speisekarte", ru: "Меню", es: "Menú" },
        "Kontakt": { en: "Contact", vi: "Liên hệ", zh: "联系", de: "Kontakt", ru: "Контакты", es: "Contacto" },
        "Rezervace": { en: "Reservation", vi: "Đặt bàn", zh: "预订", de: "Reservierung", ru: "Бронирование", es: "Reserva" },
        "Vítejte na našich stránkách": { en: "Welcome to our website", vi: "Chào mừng bạn đến với trang web của chúng tôi", zh: "欢迎访问我们的网站", de: "Willkommen auf unserer Website", ru: "Добро пожаловать на наш сайт", es: "Bienvenidos a nuestra web" },
        "Přijďte vyzkoušet": { en: "Come and taste", vi: "Hãy đến thưởng thức", zh: "欢迎来品尝", de: "Probieren Sie", ru: "Приходите попробовать", es: "Venga a probar" },
        "Naše domácí pokrmy": { en: "our homemade dishes", vi: "các món ăn gia đình của chúng tôi", zh: "我们的家常菜", de: "unsere hausgemachten Gerichte", ru: "наши домашние блюда", es: "nuestros platos caseros" },
        "Jídelní lístek": { en: "Menu", vi: "Thực đơn", zh: "菜单", de: "Speisekarte", ru: "Меню", es: "Menú" },
        "Restaurace": { en: "Restaurant", vi: "Nhà hàng", zh: "餐厅", de: "Restaurant", ru: "Ресторан", es: "Restaurante" },
        "Kontaktujte nás": { en: "Contact us", vi: "Liên hệ với chúng tôi", zh: "联系我们", de: "Kontaktieren Sie uns", ru: "Свяжитесь с нами", es: "Contáctenos" },
        "Níže jsou způsoby jak nás kontaktovat, popřípadě udělat rezervace": { en: "Below are the ways to contact us or make a reservation", vi: "Dưới đây là các cách liên hệ hoặc đặt bàn với chúng tôi", zh: "以下是联系我们或预订的方式", de: "Hier erfahren Sie, wie Sie uns kontaktieren oder reservieren können", ru: "Ниже указаны способы связаться с нами или забронировать столик", es: "A continuación encontrará cómo contactarnos o hacer una reserva" },
        "Telefon": { en: "Phone", vi: "Điện thoại", zh: "电话", de: "Telefon", ru: "Телефон", es: "Teléfono" },
        "Technické dotazy": { en: "Technical inquiries", vi: "Hỗ trợ kỹ thuật", zh: "技术咨询", de: "Technische Anfragen", ru: "Технические вопросы", es: "Consultas técnicas" },
        "Adresa": { en: "Address", vi: "Địa chỉ", zh: "地址", de: "Adresse", ru: "Адрес", es: "Dirección" },
        "Otevírací doba": { en: "Opening hours", vi: "Giờ mở cửa", zh: "营业时间", de: "Öffnungszeiten", ru: "Часы работы", es: "Horario" },
        "Pondělí - Pátek": { en: "Monday - Friday", vi: "Thứ Hai - Thứ Sáu", zh: "周一至周五", de: "Montag - Freitag", ru: "Понедельник - Пятница", es: "Lunes - Viernes" },
        "Sobota - Neděle": { en: "Saturday - Sunday", vi: "Thứ Bảy - Chủ Nhật", zh: "周六至周日", de: "Samstag - Sonntag", ru: "Суббота - Воскресенье", es: "Sábado - Domingo" },
        "Zavřeno": { en: "Closed", vi: "Đóng cửa", zh: "休息", de: "Geschlossen", ru: "Закрыто", es: "Cerrado" },
        "Možnosti platby": { en: "Payment options", vi: "Phương thức thanh toán", zh: "付款方式", de: "Zahlungsmöglichkeiten", ru: "Способы оплаты", es: "Formas de pago" },
        "Hotově": { en: "Cash", vi: "Tiền mặt", zh: "现金", de: "Bar", ru: "Наличными", es: "Efectivo" },
        "Kartou": { en: "Card", vi: "Thẻ", zh: "刷卡", de: "Karte", ru: "Картой", es: "Tarjeta" },

        // Společné anglické texty šablony
        "Loading...": { vi: "Đang tải...", zh: "加载中...", de: "Wird geladen...", ru: "Загрузка...", es: "Cargando..." },
        "Previous": { vi: "Trước", zh: "上一张", de: "Zurück", ru: "Назад", es: "Anterior" },
        "Next": { vi: "Tiếp", zh: "下一张", de: "Weiter", ru: "Далее", es: "Siguiente" },
        ", All Right Reserved.": { en: ", All Rights Reserved.", vi: ", Bảo lưu mọi quyền.", zh: "，版权所有。", de: ", Alle Rechte vorbehalten.", ru: ", Все права защищены.", es: ", Todos los derechos reservados." },
        "Designed and developed": { vi: "Thiết kế và phát triển", zh: "设计与开发", de: "Design und Entwicklung", ru: "Дизайн и разработка", es: "Diseñado y desarrollado" },
        "Distributed By": { vi: "Phân phối bởi", zh: "发行", de: "Vertrieben von", ru: "Распространяется", es: "Distribuido por" },
        "Home": { vi: "Trang chủ", zh: "首页", de: "Startseite", ru: "Главная", es: "Inicio" },
        "Cookies": { vi: "Cookie", zh: "Cookie", de: "Cookies", ru: "Cookie", es: "Cookies" },
        "Help": { vi: "Trợ giúp", zh: "帮助", de: "Hilfe", ru: "Помощь", es: "Ayuda" },
        "FQAs": { en: "FAQs", vi: "Câu hỏi thường gặp", zh: "常见问题", de: "FAQ", ru: "Вопросы и ответы", es: "Preguntas frecuentes" },

        // index.html
        "Kung fu trenérka, po letech trénování a cestování po Číně založila restauraci, kde spojuje své mistrovství bojových umění s vášní pro vaření. V její restauraci \"U dračí mámy\" hosté zažijí autentické domácí pokrmy, které vaří podle tajných rodinných receptů předávaných po generace. Každé jídlo je nejen lahodné, ale také odráží sílu, vytrvalost a harmonii, které Li Mei učí své žáky na trénincích.": {
            en: "A kung fu coach, after years of training and travelling across China, founded a restaurant where she combines her mastery of martial arts with a passion for cooking. At her restaurant \"U dračí mámy\", guests enjoy authentic home-style dishes cooked from secret family recipes passed down for generations. Every dish is not only delicious but also reflects the strength, endurance and harmony that Li Mei teaches her students in training.",
            vi: "Một nữ huấn luyện viên kung fu, sau nhiều năm luyện tập và du hành khắp Trung Quốc, đã mở một nhà hàng nơi bà kết hợp tài nghệ võ thuật với niềm đam mê nấu ăn. Tại nhà hàng \"U dračí mámy\", thực khách được thưởng thức những món ăn gia đình chính gốc, nấu theo công thức bí truyền qua nhiều thế hệ. Mỗi món ăn không chỉ ngon mà còn thể hiện sức mạnh, sự bền bỉ và hài hòa mà Li Mei dạy cho học trò của mình.",
            zh: "一位功夫教练在多年习武并游历中国之后，开办了这家餐厅，将她的武术造诣与烹饪热情融为一体。在她的餐厅\"U dračí mámy\"里，客人可以品尝到按照代代相传的家传秘方烹制的正宗家常菜。每一道菜不仅美味，还体现了李梅在训练中传授给学生的力量、毅力与和谐。",
            de: "Eine Kung-Fu-Trainerin gründete nach Jahren des Trainings und Reisen durch China ein Restaurant, in dem sie ihre Meisterschaft in den Kampfkünsten mit ihrer Leidenschaft fürs Kochen verbindet. In ihrem Restaurant \"U dračí mámy\" genießen Gäste authentische hausgemachte Gerichte nach geheimen Familienrezepten, die über Generationen weitergegeben wurden. Jedes Gericht ist nicht nur köstlich, sondern spiegelt auch die Kraft, Ausdauer und Harmonie wider, die Li Mei ihren Schülern im Training vermittelt.",
            ru: "Тренер по кунг-фу после многих лет тренировок и путешествий по Китаю открыла ресторан, в котором сочетает мастерство боевых искусств со страстью к кулинарии. В её ресторане \"U dračí mámy\" гости попробуют настоящие домашние блюда, приготовленные по секретным семейным рецептам, передаваемым из поколения в поколение. Каждое блюдо не только вкусное, но и отражает силу, выносливость и гармонию, которым Ли Мэй учит своих учеников на тренировках.",
            es: "Una entrenadora de kung fu, tras años de entrenamiento y viajes por China, fundó un restaurante donde une su maestría en las artes marciales con su pasión por la cocina. En su restaurante \"U dračí mámy\" los clientes disfrutan de auténticos platos caseros preparados según recetas familiares secretas transmitidas de generación en generación. Cada plato no solo es delicioso, sino que también refleja la fuerza, la constancia y la armonía que Li Mei enseña a sus alumnos."
        },
        "Speciální Nabídka": { en: "Special offer", vi: "Ưu đãi đặc biệt", zh: "特别推荐", de: "Sonderangebot", ru: "Специальное предложение", es: "Oferta especial" },
        "Sněz, co můžeš!": { en: "Eat all you can!", vi: "Ăn thỏa thích!", zh: "尽情畅吃！", de: "Essen, so viel Sie können!", ru: "Ешь сколько сможешь!", es: "¡Come todo lo que puedas!" },
        "All You Can Eat Buffet": { vi: "Buffet ăn thỏa thích", zh: "自助餐畅吃", de: "All-you-can-eat-Buffet", ru: "Шведский стол без ограничений", es: "Bufé libre" },
        "Vyzkoušejte naše bohaté bufetové menu plné čerstvých a chutných jídel. Každý si u nás najde to své – od salátů, přes hlavní chody až po dezerty.": {
            en: "Try our rich buffet full of fresh and tasty dishes. Everyone will find something to their liking – from salads and main courses to desserts.",
            vi: "Hãy thử thực đơn buffet phong phú với nhiều món ăn tươi ngon. Ai cũng sẽ tìm thấy món mình thích – từ salad, món chính đến tráng miệng.",
            zh: "快来品尝我们丰富的自助餐，新鲜美味的菜肴应有尽有。从凉菜、主菜到甜点，每个人都能找到自己喜欢的。",
            de: "Probieren Sie unser reichhaltiges Buffet voller frischer und leckerer Gerichte. Hier findet jeder etwas – von Salaten über Hauptgerichte bis hin zu Desserts.",
            ru: "Попробуйте наш богатый шведский стол со свежими и вкусными блюдами. Каждый найдёт что-то по вкусу – от салатов и основных блюд до десертов.",
            es: "Pruebe nuestro variado bufé lleno de platos frescos y sabrosos. Todos encontrarán algo a su gusto: desde ensaladas y platos principales hasta postres."
        },
        "Od 11:00 do 14:00": { en: "From 11:00 to 14:00", vi: "Từ 11:00 đến 14:00", zh: "11:00 至 14:00", de: "Von 11:00 bis 14:00", ru: "С 11:00 до 14:00", es: "De 11:00 a 14:00" },
        "Čaj a voda": { en: "Tea and water", vi: "Trà và nước", zh: "茶和水", de: "Tee und Wasser", ru: "Чай и вода", es: "Té y agua" },
        "ZDARMA!": { en: "FREE!", vi: "MIỄN PHÍ!", zh: "免费！", de: "GRATIS!", ru: "БЕСПЛАТНО!", es: "¡GRATIS!" },

        // about.html
        "Vítejte v": { en: "Welcome to", vi: "Chào mừng đến với", zh: "欢迎来到", de: "Willkommen bei", ru: "Добро пожаловать в", es: "Bienvenidos a" },
        "Vítejte v naší čínské restauraci, kde se snoubí láska k tradičním pokrmům a duch bojového umění! Naše restaurace, založená zkušenou trenérkou kung fu, nabízí autentické chutě Číny připravované s vášní a respektem k tradicím. Přijďte ochutnat poctivé recepty, které vás zavedou do samotného srdce Číny – od křupavých kuřecích kousků přes jemné knedlíčky až po aromatické polévky, jež posílí vaše tělo i mysl. U nás zažijete více než jen jídlo, je to cesta plná chutí a inspirace bojovým uměním.": {
            en: "Welcome to our Chinese restaurant, where a love of traditional dishes meets the spirit of martial arts! Founded by an experienced kung fu coach, our restaurant offers the authentic flavours of China, prepared with passion and respect for tradition. Come and taste honest recipes that take you to the very heart of China – from crispy chicken pieces and delicate dumplings to aromatic soups that strengthen body and mind. With us you will experience more than just a meal – it is a journey full of flavours and martial arts inspiration.",
            vi: "Chào mừng bạn đến với nhà hàng Trung Hoa của chúng tôi, nơi tình yêu với các món ăn truyền thống hòa quyện cùng tinh thần võ thuật! Được thành lập bởi một nữ huấn luyện viên kung fu giàu kinh nghiệm, nhà hàng mang đến hương vị Trung Hoa chính gốc, được chế biến bằng đam mê và sự tôn trọng truyền thống. Hãy đến thưởng thức những công thức chân thực đưa bạn đến trái tim của Trung Hoa – từ những miếng gà giòn rụm, những chiếc sủi cảo mềm mại đến các món súp thơm lừng bồi bổ cả thể chất lẫn tinh thần. Tại đây, bạn sẽ trải nghiệm nhiều hơn một bữa ăn – đó là hành trình đầy hương vị và cảm hứng võ thuật.",
            zh: "欢迎来到我们的中餐厅，这里融合了对传统美食的热爱与武术精神！本店由一位经验丰富的功夫教练创办，以热情和对传统的尊重，为您呈现地道的中国风味。快来品尝带您直抵中国腹地的地道菜谱——从香脆的鸡块、精致的饺子到滋补身心的香浓汤品。在这里，您体验到的不仅仅是一顿饭，更是一段充满美味与武术灵感的旅程。",
            de: "Willkommen in unserem chinesischen Restaurant, in dem die Liebe zu traditionellen Gerichten auf den Geist der Kampfkunst trifft! Unser Restaurant, gegründet von einer erfahrenen Kung-Fu-Trainerin, bietet authentische Aromen Chinas, zubereitet mit Leidenschaft und Respekt vor der Tradition. Probieren Sie ehrliche Rezepte, die Sie ins Herz Chinas entführen – von knusprigen Hähnchenstücken über zarte Teigtaschen bis hin zu aromatischen Suppen, die Körper und Geist stärken. Bei uns erleben Sie mehr als nur ein Essen – es ist eine Reise voller Geschmack und Inspiration aus der Kampfkunst.",
            ru: "Добро пожаловать в наш китайский ресторан, где любовь к традиционным блюдам сочетается с духом боевых искусств! Наш ресторан, основанный опытным тренером по кунг-фу, предлагает подлинные вкусы Китая, приготовленные со страстью и уважением к традициям. Приходите попробовать настоящие рецепты, которые перенесут вас в самое сердце Китая – от хрустящих кусочков курицы и нежных пельменей до ароматных супов, укрепляющих тело и дух. У нас вас ждёт больше, чем просто еда, – это путешествие, полное вкусов и вдохновения боевыми искусствами.",
            es: "¡Bienvenidos a nuestro restaurante chino, donde el amor por los platos tradicionales se une al espíritu de las artes marciales! Fundado por una experimentada entrenadora de kung fu, nuestro restaurante ofrece los auténticos sabores de China, preparados con pasión y respeto por la tradición. Venga a probar recetas honestas que le llevarán al corazón mismo de China: desde crujientes trozos de pollo y delicadas empanadillas hasta sopas aromáticas que fortalecen cuerpo y mente. Con nosotros vivirá más que una comida: es un viaje lleno de sabores e inspiración marcial."
        },
        "Let": { en: "Years", vi: "Năm", zh: "年", de: "Jahre", ru: "Лет", es: "Años" },
        "Zkušeností": { en: "of experience", vi: "kinh nghiệm", zh: "经验", de: "Erfahrung", ru: "опыта", es: "de experiencia" },
        "Otevřeno": { en: "Open", vi: "Mở cửa", zh: "开业", de: "Geöffnet", ru: "Открыто", es: "Abierto" },
        "Od roku": { en: "since", vi: "từ năm", zh: "年份", de: "seit", ru: "с года", es: "desde" },
        "Tradiční kuchyně": { en: "Traditional cuisine", vi: "Ẩm thực truyền thống", zh: "传统美食", de: "Traditionelle Küche", ru: "Традиционная кухня", es: "Cocina tradicional" },
        "Porkmy které vás povedou k srdci Číny.": { en: "Dishes that will lead you to the heart of China.", vi: "Những món ăn đưa bạn đến trái tim Trung Hoa.", zh: "带您走进中国腹地的美食。", de: "Gerichte, die Sie ins Herz Chinas führen.", ru: "Блюда, которые приведут вас в сердце Китая.", es: "Platos que le llevarán al corazón de China." },
        "Unique Experience": { vi: "Trải nghiệm độc đáo", zh: "独特体验", de: "Einzigartiges Erlebnis", ru: "Уникальные впечатления", es: "Experiencia única" },
        "A Culinary Journey": { vi: "Hành trình ẩm thực", zh: "美食之旅", de: "Eine kulinarische Reise", ru: "Кулинарное путешествие", es: "Un viaje culinario" },

        // menu.html
        "Food Menu": { vi: "Thực đơn", zh: "菜单", de: "Speisekarte", ru: "Меню", es: "Carta" },
        "Denní menu": { en: "Daily menu", vi: "Thực đơn hàng ngày", zh: "每日菜单", de: "Tagesmenü", ru: "Дневное меню", es: "Menú del día" },
        "Popular": { vi: "Phổ biến", zh: "热门", de: "Beliebt", ru: "Популярное", es: "Popular" },
        "Hlavní Jídlo": { en: "Main dishes", vi: "Món chính", zh: "主菜", de: "Hauptgerichte", ru: "Основные блюда", es: "Platos principales" },
        "Special": { vi: "Đặc biệt", zh: "特色", de: "Spezial", ru: "Особое", es: "Especial" },
        "Saláty": { en: "Salads", vi: "Salad", zh: "凉菜", de: "Salate", ru: "Салаты", es: "Ensaladas" },
        "Lovely": { vi: "Hấp dẫn", zh: "精选", de: "Köstlich", ru: "Любимое", es: "Delicioso" },
        "Taštičky": { en: "Dumplings", vi: "Sủi cảo", zh: "饺子", de: "Teigtaschen", ru: "Пельмени", es: "Empanadillas" },
        "Home-made": { vi: "Tự làm", zh: "手工", de: "Hausgemacht", ru: "Домашние", es: "Caseros" },
        "Nudle": { en: "Noodles", vi: "Mì", zh: "面条", de: "Nudeln", ru: "Лапша", es: "Fideos" },
        "All you can eat": { vi: "Ăn thỏa thích", zh: "畅吃", de: "So viel Sie möchten", ru: "Без ограничений", es: "Libre" },
        "Bufet": { en: "Buffet", vi: "Buffet", zh: "自助餐", de: "Buffet", ru: "Шведский стол", es: "Bufé" },
        "C1. Tofu na domácí způsob s rýží": { en: "C1. Home-style tofu with rice", vi: "C1. Đậu phụ kiểu nhà làm với cơm", zh: "C1. 家常豆腐配米饭", de: "C1. Tofu nach Hausart mit Reis", ru: "C1. Тофу по-домашнему с рисом", es: "C1. Tofu casero con arroz" },
        "C2. Tři delikatesy s rýží": { en: "C2. Three delicacies with rice", vi: "C2. Địa tam tiên với cơm", zh: "C2. 地三鲜配米饭", de: "C2. Drei Köstlichkeiten mit Reis", ru: "C2. Три деликатеса с рисом", es: "C2. Tres delicias con arroz" },
        "C3. Pálivé kuřecí kousky s rýží": { en: "C3. Spicy chicken pieces with rice", vi: "C3. Gà cay với cơm", zh: "C3. 辣子鸡配米饭", de: "C3. Scharfe Hähnchenstücke mit Reis", ru: "C3. Острые кусочки курицы с рисом", es: "C3. Trozos de pollo picante con arroz" },
        "C4. Sladko-kyselé kuřecí nudličky s rýží": { en: "C4. Sweet and sour chicken strips with rice", vi: "C4. Gà chua ngọt với cơm", zh: "C4. 糖醋鸡柳配米饭", de: "C4. Süß-saure Hähnchenstreifen mit Reis", ru: "C4. Курица в кисло-сладком соусе с рисом", es: "C4. Tiras de pollo agridulce con arroz" },
        "C5. Dušený bůček se zelenými fazolkami s rýží": { en: "C5. Braised pork belly with green beans and rice", vi: "C5. Ba chỉ heo om đậu que với cơm", zh: "C5. 五花肉炖豆角配米饭", de: "C5. Geschmorter Schweinebauch mit grünen Bohnen und Reis", ru: "C5. Тушёная свиная грудинка со стручковой фасолью и рисом", es: "C5. Panceta estofada con judías verdes y arroz" },
        "D1. Bramborový salát na čínský způsob": { en: "D1. Chinese-style potato salad", vi: "D1. Salad khoai tây kiểu Trung Hoa", zh: "D1. 凉拌土豆丝", de: "D1. Kartoffelsalat nach chinesischer Art", ru: "D1. Картофельный салат по-китайски", es: "D1. Ensalada de patata al estilo chino" },
        "D2. Okurkový salát s česnekem": { en: "D2. Cucumber salad with garlic", vi: "D2. Dưa chuột trộn tỏi", zh: "D2. 蒜拌黄瓜", de: "D2. Gurkensalat mit Knoblauch", ru: "D2. Огуречный салат с чесноком", es: "D2. Ensalada de pepino con ajo" },
        "D3. Severovýchodní \"tygří\" salát": { en: "D3. Northeastern \"tiger\" salad", vi: "D3. Salad \"hổ\" kiểu Đông Bắc", zh: "D3. 东北老虎菜", de: "D3. Nordöstlicher \"Tiger\"-Salat", ru: "D3. Северо-восточный салат «Тигр»", es: "D3. Ensalada \"tigre\" del noreste" },
        "D4. Celerový salát s arašídy": { en: "D4. Celery salad with peanuts", vi: "D4. Cần tây trộn lạc", zh: "D4. 芹菜拌花生", de: "D4. Selleriesalat mit Erdnüssen", ru: "D4. Салат из сельдерея с арахисом", es: "D4. Ensalada de apio con cacahuetes" },
        "D5. Salát s hovezím masem a cibulí": { en: "D5. Beef and onion salad", vi: "D5. Gỏi bò trộn hành", zh: "D5. 洋葱拌牛肉", de: "D5. Salat mit Rindfleisch und Zwiebeln", ru: "D5. Салат с говядиной и луком", es: "D5. Ensalada de ternera con cebolla" },
        "A1 Vegetariánské taštičky (15 ks)": { en: "A1 Vegetarian dumplings (15 pcs)", vi: "A1 Sủi cảo chay (15 cái)", zh: "A1 素饺子（15个）", de: "A1 Vegetarische Teigtaschen (15 Stk.)", ru: "A1 Вегетарианские пельмени (15 шт.)", es: "A1 Empanadillas vegetarianas (15 uds.)" },
        "A2 Taštičky s vepřovým masem a pekingským zelím (15 ks)": { en: "A2 Dumplings with pork and Chinese cabbage (15 pcs)", vi: "A2 Sủi cảo thịt heo cải thảo (15 cái)", zh: "A2 猪肉白菜饺子（15个）", de: "A2 Teigtaschen mit Schweinefleisch und Chinakohl (15 Stk.)", ru: "A2 Пельмени со свининой и пекинской капустой (15 шт.)", es: "A2 Empanadillas de cerdo y col china (15 uds.)" },
        "A3 Taštičky s vepřovým masem a čínskou pažitkou (15ks)": { en: "A3 Dumplings with pork and Chinese chives (15 pcs)", vi: "A3 Sủi cảo thịt heo hẹ (15 cái)", zh: "A3 猪肉韭菜饺子（15个）", de: "A3 Teigtaschen mit Schweinefleisch und Schnittknoblauch (15 Stk.)", ru: "A3 Пельмени со свининой и китайским луком (15 шт.)", es: "A3 Empanadillas de cerdo y cebollino chino (15 uds.)" },
        "A4 Taštičky s kuřecím masem a krevetami (15ks)": { en: "A4 Dumplings with chicken and shrimp (15 pcs)", vi: "A4 Sủi cảo gà và tôm (15 cái)", zh: "A4 鸡肉虾仁饺子（15个）", de: "A4 Teigtaschen mit Hähnchen und Garnelen (15 Stk.)", ru: "A4 Пельмени с курицей и креветками (15 шт.)", es: "A4 Empanadillas de pollo y gambas (15 uds.)" },
        "A5 Taštičky s hovězím masem a mrkví (15ks)": { en: "A5 Dumplings with beef and carrot (15 pcs)", vi: "A5 Sủi cảo bò cà rốt (15 cái)", zh: "A5 牛肉胡萝卜饺子（15个）", de: "A5 Teigtaschen mit Rindfleisch und Karotten (15 Stk.)", ru: "A5 Пельмени с говядиной и морковью (15 шт.)", es: "A5 Empanadillas de ternera y zanahoria (15 uds.)" },
        "B1. Nudle s masovou omáčkou": { en: "B1. Noodles with meat sauce", vi: "B1. Mì sốt thịt", zh: "B1. 肉酱面", de: "B1. Nudeln mit Fleischsoße", ru: "B1. Лапша с мясным соусом", es: "B1. Fideos con salsa de carne" },
        "B2. Nudle DaLu": { en: "B2. DaLu noodles", vi: "B2. Mì DaLu", zh: "B2. 打卤面", de: "B2. DaLu-Nudeln", ru: "B2. Лапша DaLu", es: "B2. Fideos DaLu" },
        "B3. Vegetariánské nudle": { en: "B3. Vegetarian noodles", vi: "B3. Mì xào chay", zh: "B3. 素炒面", de: "B3. Vegetarische Nudeln", ru: "B3. Вегетарианская лапша", es: "B3. Fideos vegetarianos" },
        "B4. Nudlová polévka s hovězím masem": { en: "B4. Beef noodle soup", vi: "B4. Mì bò nước", zh: "B4. 牛肉面", de: "B4. Nudelsuppe mit Rindfleisch", ru: "B4. Суп с лапшой и говядиной", es: "B4. Sopa de fideos con ternera" },
        "B5. Nudle YunTun": { en: "B5. YunTun noodles", vi: "B5. Mì vằn thắn", zh: "B5. 云吞面", de: "B5. YunTun-Nudeln", ru: "B5. Лапша с вонтонами", es: "B5. Fideos YunTun" }
    };

    var originals = new WeakMap();

    function textNodes(root) {
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                var tag = node.parentNode && node.parentNode.nodeName;
                if (tag === "SCRIPT" || tag === "STYLE" || !node.nodeValue.trim() ||
                    node.parentNode.closest("[data-no-translate]")) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        var nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        return nodes;
    }

    function applyLang(lang) {
        if (LANGS.indexOf(lang) === -1) lang = "cs";

        textNodes(document.body).forEach(function (node) {
            if (!originals.has(node)) originals.set(node, node.nodeValue);
            var original = originals.get(node);
            var key = original.replace(/\s+/g, " ").trim();
            var entry = DICT[key];
            if (!entry || !entry[lang]) {
                node.nodeValue = original;
            } else {
                var lead = original.match(/^\s*/)[0];
                var trail = original.match(/\s*$/)[0];
                node.nodeValue = lead + entry[lang] + trail;
            }
        });

        document.documentElement.lang = lang;
        document.querySelectorAll(".lang-current").forEach(function (el) {
            el.textContent = lang.toUpperCase();
        });
        document.querySelectorAll("[data-lang]").forEach(function (el) {
            el.classList.toggle("active", el.getAttribute("data-lang") === lang);
        });
        localStorage.setItem(STORAGE_KEY, lang);
    }

    document.addEventListener("click", function (e) {
        var item = e.target.closest("[data-lang]");
        if (!item) return;
        e.preventDefault();
        applyLang(item.getAttribute("data-lang"));
    });

    applyLang(localStorage.getItem(STORAGE_KEY) || "cs");
})();
