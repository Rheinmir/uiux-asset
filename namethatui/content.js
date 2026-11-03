// Nội dung viết lại bằng tiếng Việt, lời của riêng mình, từ trang namethatui.com (không chép nguyên văn). Khoá: <nền>/<slug>. Tên API, định danh, tên thuật ngữ giữ nguyên.
window.NT_FULL = {
 "_ui": {
  "anatomy": "Giải phẫu: gọi tên từng bộ phận",
  "ifCalled": "Nếu bạn từng gọi nó là…",
  "youMeant": "…thì ý bạn là",
  "prompt": "Prompt: dán thẳng cho agent",
  "debug": "Prompt gỡ lỗi: khi nó chạy sai",
  "debugHint": "Dán đoạn này rồi mô tả điều bạn đang thấy. Nó đưa sẵn cho agent danh sách các lỗi kinh điển cần loại trừ trước tiên.",
  "code": "Trong code",
  "codeHint": "Tên chính xác mà từng framework dùng cho thành phần này, mỗi dòng là cách gọi của một framework. Chọn dòng hợp với dự án của bạn, hoặc dán nó vào prompt.",
  "see": "Xem thêm",
  "copyMd": "Chép trang dạng Markdown",
  "copyPage": "Chép trang",
  "save": "Lưu",
  "share": "Chia sẻ",
  "searchHint": "Mô tả thứ bạn đang tìm…",
  "index": "Mục lục",
  "elements": "Thành phần",
  "styles": "Phong cách",
  "alsoCalled": "còn được gọi là"
 },
 "page/appkit-vs-swiftui": {
  "title": "AppKit vs SwiftUI",
  "lead": "AppKit và SwiftUI cho ra cùng một điểm ảnh trên màn hình nhưng mang hai tên thật khác nhau; chọn tên nào là tùy dự án của bạn.",
  "sections": [
   {
    "h": "Hai cách nói về cùng một thứ",
    "p": [
     "AppKit là bộ đồ nghề gốc của Mac, giống một xưởng thủ công: bạn nhặt từng linh kiện (cửa sổ, nút bấm, menu) rồi ra lệnh chi tiết cho nó. Tên lớp của AppKit mở đầu bằng NS, ví dụ NSWindow, NSMenu, NSStatusItem.",
     "SwiftUI là hướng đi mới hơn của Apple: thay vì lắp từng bộ phận, bạn mô tả căn phòng đã hoàn thiện, kiểu 'một thanh bên, rồi một danh sách, rồi nút này', và hệ thống tự dựng cũng như cập nhật. Phần tử hiện ra giống hệt, chỉ có tên gọi giản dị hơn: Button, Menu, MenuBarExtra.",
     "Chúng không phải hai loại ứng dụng tách biệt, vì một app Mac có thể trộn cả hai và thường là vậy. Hệ quả là thứ bạn chỉ tay vào hầu như luôn có hai tên hợp lệ, và dùng đúng tên sẽ giúp agent của bạn hiểu chính xác hơn rất nhiều."
    ]
   },
   {
    "h": "Nên gọi tên nào? Ba quy tắc",
    "p": [
     "• Theo dự án. Tệp có import SwiftUI và view là struct thì dùng tên SwiftUI. Nếu thấy các lớp NS và import AppKit thì dùng tên AppKit.",
     "• Với app trộn hai lớp, hãy nêu rõ lớp nào. Ví dụ 'view SwiftUI nằm trong cửa sổ AppKit' hoặc 'NSPanel được mở từ app SwiftUI của tôi'. Ranh giới giữa hai lớp là chỗ agent dễ lạc nhất.",
     "• Khi chưa chắc, đưa cả hai tên. Chẳng hạn mô tả biểu tượng ở thanh menu và ghi chú: bên SwiftUI là MenuBarExtra, bên AppKit là NSStatusItem. Agent sẽ tự xem dự án rồi chọn cái hợp."
    ]
   },
   {
    "h": "Các prompt mẫu để dán cho agent",
    "p": [
     "• Dự án SwiftUI: Trong app macOS SwiftUI này, cho MenuBarExtra mở ra một cửa sổ kiểu popover và giữ nó hiển thị trên thanh menu kể cả khi cửa sổ chính đã đóng.",
     "• Dự án AppKit: Trong app macOS AppKit này, chỉnh NSStatusItem của NSStatusBar.system: nút của nó dùng ảnh template và hiện một NSMenu khi được bấm.",
     "• Chưa biết là loại nào: Sửa biểu tượng app nhỏ cạnh đồng hồ Mac, tức menu bar extra, mà bên SwiftUI là MenuBarExtra còn bên AppKit là NSStatusItem. Hãy xem dự án và sửa phần đã có, đừng thêm một cái thứ hai."
    ]
   },
   {
    "h": "Những câu hỏi ai cũng hỏi",
    "p": [
     "• SwiftUI có thay thế AppKit không? Đang dần dần, nhưng chưa xong. Apple khuyến nghị SwiftUI cho app mới, song vẫn tiếp tục phát hành và viết tài liệu cho API AppKit mới. Quy tắc thực tế: màn hình mới viết bằng SwiftUI, chỉ dùng AppKit khi hành vi đặc thù của Mac mà bạn cần chưa có trong SwiftUI.",
     "• Một app dùng cả hai được không? Được, và đa số app Mac nghiêm túc đều làm vậy. NSViewRepresentable đặt một view AppKit vào trong SwiftUI, còn NSHostingView làm chiều ngược lại. Vì thế việc nêu rõ lớp cần sửa rất quan trọng.",
     "• Mỗi control SwiftUI có thật sự là control AppKit bên dưới không? Đừng mặc định như thế. Có cái được nối cầu, nhiều cái thì không, và Apple coi đó là chi tiết cài đặt. Hãy xem Button và NSButton là hai API khác nhau tình cờ trông giống nhau.",
     "• AppKit và UIKit có phải một thứ không? Không: AppKit dành cho Mac, UIKit dành cho iPhone/iPad. Tiền tố cho biết ngay: NSButton thuộc Mac, UIButton thuộc iOS. Mac Catalyst là một thứ thứ ba: app iPad khoác áo Mac."
    ]
   },
   {
    "h": "Tra cứu thêm",
    "p": [
     "Mọi mục macOS trên NameThatUI đều ghi cả hai tên trong bảng IN CODE, và Translation Table gom hơn 60 phép đối chiếu vào một chỗ. Bạn cứ xuất phát từ thứ mình nhìn thấy, rồi lấy tên mà dự án cần."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "MenuBarExtra (macos) · MenuBarExtra: Tên SwiftUI của biểu tượng nhỏ trên thanh menu.",
     "NSStatusItem (macos) · NSStatusItem: Tên AppKit của đúng thứ đó.",
     "UIKit: Framework của Apple cho iPhone và iPad, với UIButton chứ không phải NSButton. Không dùng cho app chỉ chạy trên Mac.",
     "Mac Catalyst: Một app iPad mặc áo Mac. Nó chạy UIKit trên Mac, không phải AppKit hay SwiftUI.",
     "Electron: Trang web được bọc trong khung desktop (Chromium cộng Node). Từ vựng giao diện của nó nằm ở tab Web của site."
    ]
   }
  ]
 },
 "page/home": {
  "title": "NameThatUI — Phần tử UI này gọi là gì?",
  "lead": "Từ điển trực quan về UI. Bạn cứ tả thứ mình thấy bằng lời thật tùy tiện; đổi lại, bạn nhận được tên chính thức, ký hiệu API và một prompt dán là dùng được cho coding agent của mình.",
  "sections": [
   {
    "h": "What's this UI element called?",
    "p": [
     "Ô tìm kiếm nhận những mô tả bình dân, ví dụ như các câu dưới đây. Bấm ⌘K để mở.",
     "Nếu chẳng khớp mô tả nào, trang báo 'Nothing matched that description' và gợi ý bạn thử tả vẻ ngoài hoặc vị trí của nó, chẳng hạn 'mấy chấm dưới slideshow' hay 'thanh vẫn nằm yên khi tôi cuộn'.",
     "Không gọi tên nổi cả phong cách nhìn? Hãy thử Name That Vibe.",
     "Nhấn đúp vào bất kỳ từ nào trên site để xem định nghĩa bằng ngôn ngữ thường.",
     "• nền nhạt phía sau biểu tượng trên thanh menu",
     "• lớp tối trong suốt phía sau một cửa sổ popup",
     "• chữ xám trong ô nhập, biến mất khi bạn gõ",
     "• chấm tròn kéo để chỉnh âm lượng",
     "• chữ bị cắt và thêm ba chấm"
    ]
   },
   {
    "h": "Bộ lọc và số lượng mục",
    "p": [
     "Có thể duyệt toàn bộ 91 mục, trong đó 33 mục macOS và 58 mục Web. Có thể sắp theo Newest hoặc Popular, và có nút Surprise me để mở ngẫu nhiên một mục."
    ]
   },
   {
    "h": "Mới thêm gần đây",
    "p": [
     "Phần này nêu ba mục vừa lên sóng gần nhất: Rule Editor (Predicate Editor), mục so sánh ba hiệu ứng cuộn Scroll Reveal / Stacking Cards / Hide-on-Scroll Header, và Waffle Menu (App Launcher). Toàn bộ danh sách nằm bên dưới."
    ]
   },
   {
    "h": "Hướng dẫn: những quyết định trước khi đặt tên",
    "p": [
     "Ba bài hướng dẫn nằm cuối trang chủ.",
     "AppKit vs SwiftUI: cùng một phần tử Mac có hai tên thật, nên gọi tên nào trong prompt.",
     "Swift vs Electron: app native hay web bọc trong vỏ, ngã rẽ đầu tiên và bộ từ vựng mà nó quyết định.",
     "The Translation Table: hơn 60 phần tử, đi từ tên thường sang AppKit rồi SwiftUI, có thể tìm kiếm."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Rule Editor (Predicate Editor) (macos) · NSPredicateEditor: Các hàng menu pop-up kèm nút − và + dùng để dựng một điều kiện tìm kiếm",
     "Scroll Reveal vs. Stacking Cards vs. Hide-on-Scroll Header (web) · animation-timeline: view(): Ba hiệu ứng chuyển động khi cuộn: hiện dần, chồng thẻ, và header tự ẩn",
     "Waffle Menu (App Launcher) (web) · <button aria-expanded aria-controls>: Nút chín chấm ở góc màn hình, bấm vào mở ra bảng biểu tượng ứng dụng",
     "Product Tour (Coach Marks) (web) · <Tour>: Phần hướng dẫn lần đầu dùng, làm tối trang và chiếu sáng từng nút một",
     "Submenu vs. Cascader vs. Drill-Down Menu (web) · aria-haspopup=\"menu\": Ba cách một menu mở tầng kế tiếp: bên cạnh, theo cột, hoặc ngay tại chỗ",
     "Hover Highlight vs. Hover Lift vs. Cursor Spotlight (web) · :hover: Ba việc một nút hay thẻ có thể làm khi chuột lướt qua",
     "Typewriter vs. Rotating Words vs. Text Shimmer (web) · background-clip: text: Chữ tự gõ ra, đổi một từ, hoặc lấp lánh trong lúc AI đang suy nghĩ",
     "Wheel Picker vs. Time Field vs. Clock Dial (web) · <input type=\"time\">: Ba cách chọn giờ: bánh xe quay, ô gõ tay, mặt đồng hồ tròn",
     "Pie Chart vs. Donut Chart (web) · SectorMark: Hình tròn chia thành các lát, hoặc cùng vòng đó nhưng khoét rỗng giữa",
     "Floating Action Button vs. Chat Launcher vs. Back-to-Top (web) · position: fixed: Ba nút tròn khác nhau cùng nổi ở góc dưới bên phải màn hình",
     "Data Table (Table View) (web) · <table>: Các hàng và cột bản ghi, với tên cột có thể bấm để sắp xếp",
     "Bottom Navigation (Tab Bar) (web) · UITabBar: Hàng từ ba đến năm biểu tượng ghim ở đáy app điện thoại để chuyển giữa các mục",
     "Timeline (web) · <Timeline>: Một đường dọc có các chấm, mỗi chấm kèm một sự kiện có ngày, xếp theo thứ tự xảy ra",
     "Status Dot (Presence Indicator) (web) · <PresenceBadge status=\"available\" />: Chấm tròn nhỏ có màu trên avatar hoặc hàng, báo trạng thái trực tuyến, vắng mặt, bận hay đang phát",
     "Chat Bubble (Message Bubble) (web) · chat-bubble: Khung bo tròn bao quanh một tin nhắn trong hội thoại, tin của bạn một bên, tin của họ bên kia",
     "Steps (web) · aria-current=\"step\": Các vòng tròn đánh số trải dọc phía trên màn thanh toán hay trình hướng dẫn, mỗi vòng một giai đoạn",
     "Avatar Group (web) · AvatarGroup: Các vòng tròn ảnh hồ sơ chồng lên nhau, có viền ngăn, và dấu +N ở cuối",
     "Multi-select (web) · <select multiple>: Một control chứa nhiều giá trị: dropdown có checkbox, ô chip, và danh sách chuyển hai khung",
     "Scrollspy (web) · IntersectionObserver: Danh sách On this page mà liên kết hiện tại đi theo phần bạn đang đọc",
     "Inline Alert vs. Callout vs. Banner (web) · <Alert severity=\"warning\">: Ba loại thông báo nằm trong trang, đặt tên theo vị trí, và không cái nào là toast",
     "Sign-in Form (web) · autocomplete=\"current-password\": Những phần có thể gọi tên của form đăng nhập: con mắt, đường OR và các nút Continue with",
     "Pagination (web) · <nav aria-label=\"pagination\">: Các nút số trang dưới một danh sách, cùng bản dạng chấm gọi là page control",
     "Date Picker (web) · <input type=\"date\">: Lịch nhỏ bật lên ở ô ngày, cùng dải tô sáng khi chọn khoảng",
     "Parallax Scrolling (web) · animation-timeline: scroll(): Các lớp cuộn với tốc độ khác nhau, nền chậm hơn và tạo cảm giác chiều sâu",
     "Carousel (web) · aria-roledescription=\"carousel\": Dải các slide bạn lật qua bằng mũi tên hoặc các chấm nhỏ",
     "Site Header vs. Navigation Bar (web) · <header>: Cả dải trên cùng là header, còn hàng liên kết trang bên trong nó là nav",
     "Card (web) · <Card>: Hình chữ nhật chứa media, tiêu đề, nội dung và chân thẻ, mỗi phần đều có tên",
     "Resize Handle (Size Grip) (web) · resize: Ba vạch chéo ở góc hộp văn bản mà bạn kéo để làm nó to ra",
     "Insertion Caret (Insertion Point) (macos) · NSTextView.insertionPointColor: Vạch nhấp nháy trong văn bản, đánh dấu chỗ ký tự kế tiếp sẽ xuất hiện",
     "Hamburger Menu (Nav Drawer) (web) · aria-expanded + aria-controls: Nút ba vạch và bảng điều hướng trượt ra khi bấm",
     "Bento Grid (web) · display: grid + grid-column: span 2: Một lưới duy nhất với các ô cỡ khác nhau, xếp khít như hộp bento",
     "Masonry Layout (Pinterest Grid) (web) · columns: Các thẻ cao thấp khác nhau xếp vào cột mà không để hở giữa các hàng",
     "Easing (Timing Function) (web) · transition-timing-function: Đường cong tốc độ của hoạt ảnh, lý do chuyển động trông mượt hay máy móc",
     "Spring Animation (web) · transition={{ type: \"spring\", stiffness, damping }}: Chuyển động theo vật lý, vọt quá đích rồi lắng xuống",
     "Text Scramble (Decode Effect) (web) · ScrambleTextPlugin: Các ký tự ngẫu nhiên xáo trộn rồi dừng lại thành đúng chữ thật",
     "Lightbox (web) · <dialog>: Lớp phủ phóng to ảnh khi bấm, làm tối trang phía sau",
     "Marquee (web) · animation + @keyframes translateX: Nội dung tự cuộn ngang thành vòng lặp bất tận",
     "Pointer (Cursor) (macos) · NSCursor: Mọi hình dạng con trỏ chuột có thể mang, kèm tên thật của từng loại",
     "Alert (macos) · NSAlert: Cửa sổ nhỏ ở giữa có biểu tượng kèm huy hiệu, một dòng in đậm và các nút Cancel/OK",
     "Slider (macos) · NSSlider: Núm tròn kéo dọc thanh trượt để chọn một giá trị trong khoảng",
     "Color Well (macos) · NSColorWell: Nút mẫu màu nhỏ hiển thị màu hiện tại và mở bảng chọn màu",
     "Form Field (web) · <label for>: Mọi phần của một ô nhập có nhãn: label, placeholder, chữ gợi ý và dòng lỗi màu đỏ",
     "Truncation (Ellipsis & Line Clamp) (web) · text-overflow: ellipsis: Chữ bị cắt ngắn bằng dấu … ở cuối dòng, sau N dòng, hoặc ở giữa",
     "Drag & Drop (web) · ondrop: Các tay nắm, handle, bản xem trước và dấu hiệu thả quanh một thao tác kéo",
     "Divider vs. Separator vs. Rule (web) · <hr>: Cùng một đường mảnh có thể đánh dấu đổi chủ đề, tách control, hoặc chỉ để trang trí",
     "Progress Ring vs. Spinner vs. Progress Bar (web) · <progress>: Spinner nghĩa là hãy chờ; vòng hoặc thanh có thể cho biết đã xong bao nhiêu việc",
     "Mac Window (macos) · NSWindow: Khung app Mac di chuyển được, từ title bar, toolbar đến các cạnh co giãn",
     "Split View (macos) · NSSplitView: Các khung có thể đổi cỡ, ngăn bằng đường chia kéo được bên trong cửa sổ Mac",
     "Scroll View (Scroller) (macos) · NSScrollView: Một khung nhìn mà thanh cuộn của AppKit được gọi là scroller",
     "Search Field (macos) · NSSearchField: Ô nhập liệu Mac có sẵn tìm kiếm, nút xóa và điều khiển truy vấn gần đây",
     "Save Panel (macos) · NSSavePanel: Hộp thoại Mac chuẩn để đặt tên tệp và chọn nơi lưu",
     "Token Field (macos) · NSTokenField: Ô nhập biến các giá trị nhận ra được thành token bo tròn có thể xóa",
     "Combo Button (macos) · NSComboButton: Một hành động chính gắn liền với mũi tên riêng để mở các hành động liên quan",
     "Level Indicator (macos) · NSLevelIndicator: Đồng hồ đo trên Mac, hiện dưới dạng thanh dung lượng, sao đánh giá hoặc thước đo mức liên quan",
     "Column View (Browser) (macos) · NSBrowser: Các cột kiểu Finder, mỗi cột mở ra một tầng kế tiếp của cấu trúc phân cấp",
     "Outline View (macos) · NSOutlineView: Cây các hàng thụt lề, bung ra để lộ các mục con lồng bên trong",
     "The Three Dots (Overflow Menu) (web) · <button>: Chấm ngang, chấm dọc, ba vạch và dấu ba chấm mang những nghĩa khác nhau",
     "Menu Bar (macos) · NSApp.mainMenu: Dải trên cùng màn hình Mac, từng phần đều được ghi nhãn",
     "Context Menu (macos) · NSMenu: Menu mở ngay tại con trỏ khi nhấp chuột phải hoặc Control-click vào một mục",
     "Disclosure Triangle (macos) · NSOutlineView: Control nhỏ xoay được, dùng để hiện hoặc ẩn nội dung lồng bên trong",
     "Dock Badge (macos) · NSDockTile.badgeLabel: Nhãn đỏ hiện số đếm hoặc trạng thái phủ lên biểu tượng của app trên Dock",
     "Focus Ring (macos) · NSView.focusRingType: Quầng sáng màu nhấn cho biết control nào đang nhận đầu vào bàn phím",
     "Inspector (macos) · View.inspector(isPresented:content:): Bảng bên phải để xem và sửa chi tiết của mục đang chọn",
     "Panel (Floating Window / HUD) (macos) · NSPanel: Cửa sổ macOS phụ trợ nổi phía trên các cửa sổ tài liệu liên quan",
     "Popover (macos) · NSPopover: Bong bóng nổi có mũi tên chỉ ngược về control đã mở nó",
     "Pop-Up Button vs. Pull-Down Button vs. Combo Box (macos) · NSPopUpButton: Ba control macOS trông giống nhau, dùng để chọn giá trị hoặc gọi một hành động trong menu",
     "Segmented Control (macos) · NSSegmentedControl: Một hàng lựa chọn nối liền nhau, đoạn đang chọn được làm nổi rõ",
     "Sheet (macos) · NSWindow.beginSheet(_:completionHandler:): Bảng modal gắn vào một cửa sổ macOS chứ không chiếm cả ứng dụng",
     "Sidebar (Source List) (macos) · NavigationSplitView: Cột điều hướng trong mờ dọc mép trái cửa sổ macOS",
     "Stepper (macos) · NSStepper: Cặp mũi tên lên xuống gọn nhẹ để tăng hoặc giảm một giá trị",
     "Toolbar (Unified Title Bar) (macos) · NSToolbar: Hàng thao tác của cửa sổ, gộp liền vào title bar macOS hiện đại",
     "Traffic Lights (Window Controls) (macos) · NSWindow.standardWindowButton(_:): Ba nút đỏ, vàng, xanh ở góc trên trái cửa sổ macOS",
     "Visual Effect Material (Vibrancy) (macos) · NSVisualEffectView: Nền trong mờ thích ứng, dùng phía sau thanh bên, menu và panel của macOS",
     "Toast (Snackbar) (web) · role=\"status\": Thông báo ngắn, không chặn thao tác, hiện lên sau một hành động",
     "Modal Dialog vs. Drawer vs. Sheet (web) · <dialog>: Ba mẫu lớp phủ phân biệt theo vị trí, phạm vi và độ sâu của tác vụ",
     "Popover vs. Dropdown Menu vs. Tooltip (web) · popover: Ba lớp phủ neo vào phần tử với cách kích hoạt, nội dung và luật đóng khác nhau",
     "Scrim (Backdrop / Overlay) (web) · ::backdrop: Lớp trong mờ tách bề mặt modal ra khỏi trang",
     "Skeleton vs. Spinner (web) · aria-busy=\"true\": Hai chỉ báo đang tải, một cho bố cục đoán trước được, một cho thời gian chờ không rõ",
     "Combobox (Autocomplete / Typeahead) (web) · role=\"combobox\": Ô nhập văn bản đi kèm danh sách gợi ý đã lọc để chọn",
     "Command Palette (web) · Command: Bộ khởi chạy tìm kiếm được, ưu tiên bàn phím, cho hành động và điều hướng",
     "Accordion (Disclosure) (web) · <details>: Các mục xếp chồng mà tiêu đề của chúng bung ra và thu lại nội dung",
     "Tabs (web) · role=\"tablist\": Một hàng nhãn duy nhất để đổi nội dung của một vùng dùng chung",
     "Badge vs. Chip vs. Pill vs. Tag (web) · Badge: Các nhãn gọn, phân biệt theo ý nghĩa, hình dạng và khả năng tương tác",
     "Breadcrumbs (web) · <nav>: Đường lần theo cấp bậc từ trang hiện tại ngược về các trang cha",
     "Sticky vs. Fixed Positioning (web) · position: sticky: Hai cách giữ phần tử luôn hiển thị, với khối chứa khác nhau",
     "Focus Ring (:focus-visible) (web) · :focus-visible: Đường viền nhận biết bàn phím, cho thấy control đang hoạt động",
     "Empty State (web) · <section>: Lời hướng dẫn có chủ đích, hiện khi một màn hình chưa có nội dung",
     "Hover Card (web) · HoverCard: Bản xem trước phong phú, không modal, hiện ra từ một tham chiếu đang được rê chuột hoặc focus",
     "Switch vs. Checkbox vs. Radio (web) · <input type=\"checkbox\" role=\"switch\">: Các control cho cài đặt bật/tắt, lựa chọn độc lập, hoặc chọn một trong nhóm",
     "Toggle Group (Segmented Control) (web) · ToggleGroup: Một hàng tùy chọn gọn nối liền nhau, luôn có một lựa chọn được giữ",
     "Menu Bar Extra (Status Item) (macos) · NSStatusItem: Biểu tượng nằm ở phía bên phải thanh menu macOS"
    ]
   }
  ]
 },
 "macos/alert": {
  "lead": "Hãy tích ô “Don’t ask me again” — ô đó chính là suppression button (nút chặn nhắc lại) của NSAlert",
  "sym": [
   "NSAlert",
   ".alert(_:isPresented:actions:message:)"
  ],
  "aka": [
   "alert dialog",
   "warning dialog",
   "confirmation dialog",
   "message box",
   "system prompt"
  ],
  "def": "Khi bạn tả “cái cửa sổ cảnh báo nhỏ có biểu tượng ứng dụng và hai nút”, thứ đó là một alert (hộp thoại cảnh báo) — tức NSAlert. Nó hiện icon của app (với cảnh báo thì icon được gắn thêm tam giác vàng), một dòng thông điệp in đậm, đoạn chữ giải thích nhỏ hơn bên dưới, và các nút; nút nào được thêm vào đầu tiên sẽ thành nút mặc định màu xanh. Có thể chạy nó ở dạng app-modal bằng runModal(), hoặc gắn vào đúng một cửa sổ bằng beginSheetModal(for:) — lúc đó nó trượt ra từ thanh tiêu đề của cửa sổ ấy giống một sheet. Ô “Don't ask me again” là nút chặn nhắc lại có sẵn của chính alert này.",
  "phrases": [
   "cái popup có icon ứng dụng và tam giác cảnh báo màu vàng",
   "cửa sổ nhỏ giữa màn hình hỏi “bạn chắc chưa”, kèm hai nút",
   "cái hộp có ô tích “đừng hỏi lại nữa”",
   "thông báo cảnh báo có một dòng đậm và chữ xám nhỏ hơn ngay dưới",
   "nút xanh tự bấm khi mình nhấn Enter",
   "popup xác nhận trước khi xoá thứ gì đó"
  ],
  "anatomy": [
   {
    "n": "Badged app icon",
    "sym": "NSAlert.icon",
    "d": "Câu “tam giác vàng nằm trên icon ứng dụng” chỉ icon của alert — đó là icon app của bạn, được gắn biểu tượng cảnh báo khi alertStyle là .warning hoặc .critical."
   },
   {
    "n": "Message text",
    "sym": "NSAlert.messageText",
    "d": "“Dòng chữ đậm” chính là messageText — câu tóm tắt gói trong một câu, và nên viết dạng câu hỏi khi alert đòi người dùng quyết định."
   },
   {
    "n": "Informative text",
    "sym": "NSAlert.informativeText",
    "d": "“Dòng chữ xám nhỏ hơn dưới dòng đậm” là informativeText — nơi nói rõ hậu quả bằng một câu."
   },
   {
    "n": "Suppression checkbox",
    "sym": "NSAlert.showsSuppressionButton",
    "d": "“Ô tích đừng hỏi lại” là suppression button — bật nó bằng showsSuppressionButton rồi đọc suppressionButton.state sau khi alert trả kết quả."
   },
   {
    "n": "Default button",
    "sym": "NSAlert.addButton(withTitle:)",
    "d": "“Nút màu xanh” là nút mặc định — nút được thêm vào alert đầu tiên; nó nhận màu accent và phản hồi phím Return."
   }
  ],
  "prompt": "Hãy hiển thị một alert gốc của macOS bằng NSAlert (trong SwiftUI dùng .alert): messageText là dòng tóm tắt in đậm, còn informativeText là phần giải thích nhỏ hơn. Thêm nút bằng addButton(withTitle:) — nút đầu tiên được thêm sẽ trở thành nút mặc định màu xanh và đáp lại phím Return; nút đặt tên Cancel thì đáp lại phím Escape. Gán showsSuppressionButton = true để có ô “Don't ask me again”, và đọc suppressionButton.state sau khi alert đóng.",
  "debug": "Hãy gỡ lỗi alert macOS của tôi (NSAlert, SwiftUI View.alert). Loại trừ lần lượt các khả năng: alert bị hiển thị ngoài main thread; runModal chặn đứng cả ứng dụng trong khi ý định là dùng beginSheetModal(for:) để gắn vào một cửa sổ; nút mặc định ăn phím Return là nút được thêm ĐẦU TIÊN chứ không phải nút bạn tưởng; trạng thái ô chặn nhắc lại chưa bao giờ được lưu vào defaults. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSAlert"
   },
   {
    "lang": "SwiftUI",
    "text": ".alert(_:isPresented:actions:message:)"
   },
   {
    "lang": "AppKit",
    "text": "NSAlert.messageText"
   },
   {
    "lang": "AppKit",
    "text": "NSAlert.informativeText"
   },
   {
    "lang": "AppKit",
    "text": "NSAlert.showsSuppressionButton"
   },
   {
    "lang": "AppKit",
    "text": "NSAlert.addButton(withTitle:)"
   },
   {
    "lang": "AppKit",
    "text": "NSAlert.alertStyle .warning / .informational / .critical"
   },
   {
    "lang": "AppKit",
    "text": "NSAlert.beginSheetModal(for:completionHandler:)",
    "note": "gắn vào một cửa sổ thay vì chạy modal toàn app"
   }
  ],
  "see": [
   "macos/sheet",
   "macos/save-panel",
   "macos/panel",
   "web/dialog-drawer-sheet",
   "web/alert-callout-banner"
  ]
 },
 "macos/color-well": {
  "lead": "Bấm vào một ô màu — dải điều khiển này là NSColorWell ở kiểu expanded; còn ống hút màu là NSColorSampler",
  "sym": [
   "NSColorWell",
   "ColorPicker"
  ],
  "aka": [
   "color picker button",
   "color swatch control",
   "color chooser",
   "color selector"
  ],
  "def": "Khi bạn tả “ô vuông nhỏ đang hiện màu hiện tại”, thứ đó là một color well (ô chọn màu) — NSColorWell. Từ macOS 13 nó có ba kiểu hiển thị: minimal (chỉ có ô màu), default, và expanded — kiểu hiện đại, kèm một nút caret gắn liền bên cạnh. Bấm vào well kiểu expanded sẽ mở một popover nhanh gồm lưới ô màu và một ống hút; còn nút caret mở bảng màu đầy đủ. Ống hút lấy mẫu bất kỳ pixel nào trên màn hình lại là một API riêng, chỉ cần gọi một lần: NSColorSampler.",
  "phrases": [
   "hình chữ nhật nhỏ đang hiển thị màu hiện tại",
   "ô mẫu màu bấm vào để mở bảng chọn màu",
   "cái ống hút để lấy màu từ trên màn hình",
   "ô vuông nhỏ có màu, bên cạnh có mũi tên",
   "lưới các ô màu bật lên",
   "nút để chọn màu trong phần cài đặt"
  ],
  "anatomy": [
   {
    "n": "Color swatch",
    "sym": "NSColorWell.color",
    "d": "“Vùng được tô màu” chính là swatch (ô mẫu) — nó luôn hiện màu hiện tại của well và là chỗ để bấm mở bộ chọn nhanh."
   },
   {
    "n": "Color-panel button",
    "sym": "NSColorWell.Style.expanded",
    "d": "“Đoạn mũi tên nhỏ cạnh ô màu” là nút riêng mà kiểu expanded thêm vào — bấm vào để mở bảng màu đầy đủ."
   },
   {
    "n": "Quick color popover",
    "sym": "NSColorWell.colorWellStyle",
    "d": "“Lưới ô màu bật lên” là bộ chọn nhanh của kiểu expanded — các ô màu để chọn gọn, không cần mở cả bảng màu."
   },
   {
    "n": "Eyedropper (color sampler)",
    "sym": "NSColorSampler",
    "d": "“Ống hút lấy màu từ bất cứ đâu trên màn hình” là color sampler của hệ thống — chỉ một lời gọi: NSColorSampler().show { color in … }."
   }
  ],
  "prompt": "Hãy thêm một color well gốc của macOS — NSColorWell (trong SwiftUI: ColorPicker). Đặt colorWellStyle = .expanded để có control hai phần kiểu hiện đại: bấm vào ô màu thì mở popover lưới màu nhanh có kèm ống hút, còn nút caret mở NSColorPanel đầy đủ. Nếu chỉ cần một ống hút màu màn hình đứng riêng thì dùng NSColorSampler().show { color in … }.",
  "debug": "Hãy gỡ lỗi color well macOS của tôi (NSColorWell, SwiftUI ColorPicker). Loại trừ lần lượt các khả năng: NSColorPanel dùng chung phục vụ mọi well trong app nên hai well giành nhau cùng một bảng; cập nhật liên tục tràn vào target action thay vì chỉ chốt khi bảng đóng; ống hút hỏng vì chưa có quyền Screen Recording; màu bị lệch do trộn lẫn hai không gian màu sRGB và Display P3. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSColorWell"
   },
   {
    "lang": "SwiftUI",
    "text": "ColorPicker"
   },
   {
    "lang": "AppKit",
    "text": "NSColorWell.colorWellStyle .minimal / .default / .expanded (macOS 13+)"
   },
   {
    "lang": "AppKit",
    "text": "NSColorWell.color"
   },
   {
    "lang": "AppKit",
    "text": "NSColorSampler",
    "note": "ống hút màu đứng riêng, độc lập"
   },
   {
    "lang": "AppKit",
    "text": "NSColorWell.supportsAlpha"
   }
  ],
  "see": [
   "macos/popover",
   "macos/popup-pulldown-combo",
   "macos/panel"
  ]
 },
 "macos/column-view": {
  "lead": "Hãy bấm lần lượt qua các cột — mỗi lựa chọn mở ra cột kế tiếp",
  "sym": [
   "NSBrowser",
   "NSBrowserCell"
  ],
  "aka": [
   "browser view",
   "Finder column view",
   "Miller columns",
   "hierarchical browser"
  ],
  "def": "Column view là kiểu trình duyệt phân cấp, trong đó mỗi nhánh được chọn sẽ mở các mục con của nó ở cột tiếp theo bên phải. Chế độ Column của Finder là ví dụ quen thuộc nhất: nhiều tầng cha-con cùng hiện một lúc, nên đường dẫn được nhìn thấy theo không gian chứ không chỉ là chuỗi chữ. Control gốc của AppKit cho việc này là NSBrowser; còn NavigationSplitView chỉ là cách ghép gần giống trong SwiftUI.",
  "phrases": [
   "cái cột kiểu Finder",
   "các thư mục mở ra thành cột sang bên phải",
   "trình duyệt file mà mỗi cấp lại thêm một cột",
   "các cột đặt cạnh nhau cho thấy đường dẫn thư mục",
   "trình duyệt phân cấp có mũi tên ở cuối mỗi dòng"
  ],
  "anatomy": [
   {
    "n": "Path column",
    "sym": "NSBrowser",
    "d": "Câu “mỗi thư mục mở ra trong một cột mới” nói về path column (cột đường dẫn) của một NSBrowser."
   },
   {
    "n": "Branch indicator",
    "sym": "NSBrowserCell.isLeaf",
    "d": "“Mũi tên nhỏ ở cuối dòng thư mục” là branch indicator (dấu hiệu nhánh) của một cell không phải lá."
   },
   {
    "n": "Selected path",
    "sym": "NSBrowser.path",
    "d": "“Dòng được tô sáng trong mỗi cột” là selected path (đường dẫn đang chọn) đi xuyên qua trình duyệt."
   }
  ],
  "prompt": "Hãy dựng một Column View kiểu Finder bằng NSBrowser và NSBrowserCell: khi chọn một dòng không phải lá thì các mục con của nó hiện ngay trong một cột mới nằm sát bên phải, giữ nguyên đường dẫn phân cấp đang nhìn thấy. Đừng thay bằng danh sách phẳng hay một bố cục sidebar-detail đơn lẻ.",
  "debug": "Hãy gỡ lỗi column view macOS của tôi (NSBrowser, Miller columns). Loại trừ lần lượt các khả năng: các cột hiển thị dữ liệu cũ vì reloadColumn/reloadData không hề chạy sau khi model thay đổi; nhầm lẫn giữa việc chọn theo đường dẫn với các hàm delegate theo từng item; việc nạp con theo kiểu lazy không bao giờ được kích hoạt vì isLeafItem trả sai; vị trí cuộn ngang bị nhảy khi thêm cột. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSBrowser"
   },
   {
    "lang": "AppKit",
    "text": "NSBrowserCell"
   },
   {
    "lang": "SwiftUI",
    "text": "NavigationSplitView",
    "note": "chỉ tương đương gần đúng; không có control gốc tương ứng trực tiếp"
   }
  ],
  "see": [
   "macos/outline-view",
   "macos/sidebar",
   "macos/scroll-view",
   "macos/disclosure-triangle",
   "web/data-table"
  ]
 },
 "macos/combo-button": {
  "lead": "Một nút, hai vùng: phần hành động chính và phần mũi tên mở menu gắn kèm",
  "sym": [
   "NSComboButton",
   "NSComboButton.Style.split"
  ],
  "aka": [
   "split button",
   "menu-arrow button",
   "action-and-menu button",
   "NSComboButton"
  ],
  "def": "Combo button ghép hai vùng bấm kề nhau: một nút chính thực hiện ngay hành động mặc định, và một nút mũi tên nhỏ mở ra các lựa chọn liên quan. Pop-up button thì khác, nó hiển thị giá trị đang được chọn; còn pull-down button mở menu từ cả control và không có vùng hành động chính tách riêng. NSComboButton có từ macOS 13 trở lên.",
  "phrases": [
   "cái nút có mũi tên nhỏ gắn riêng bên cạnh",
   "một nút vừa bấm được vừa có dropdown",
   "nút hành động tách đôi, menu nằm bên phải",
   "nút chính nối liền với một nút chevron bé xíu",
   "nút mà nhãn thì thực hiện việc, còn mũi tên thì mở các lựa chọn"
  ],
  "anatomy": [
   {
    "n": "Primary action region",
    "sym": "NSComboButton.action",
    "d": "“Nửa chính làm việc ngay lập tức” là primary action region (vùng hành động chính)."
   },
   {
    "n": "Menu disclosure region",
    "sym": "NSComboButton.menu",
    "d": "“Mũi tên nhỏ riêng gắn vào nút” là menu disclosure region (vùng mở menu)."
   },
   {
    "n": "Split divider",
    "sym": "NSComboButton.Style.split",
    "d": "“Đường kẻ nhỏ giữa nhãn và mũi tên” là split divider (vạch chia đôi)."
   }
  ],
  "prompt": "Hãy dùng Combo Button với NSComboButton (macOS 13+) ở kiểu split: bấm vào vùng chính thì thực hiện hành động chính, còn vùng mũi tên gắn kèm sẽ mở NSMenu của nó. Đừng dùng pop-up button (loại hiện lựa chọn hiện tại) hay pull-down button (loại mà bấm cả nút là mở menu hành động).",
  "debug": "Hãy gỡ lỗi combo button macOS của tôi (NSComboButton, macOS 13+). Loại trừ lần lượt các khả năng: nhầm giữa kiểu unified và split — ở unified cả nút hiện menu, ở split chỉ phần mũi tên làm vậy; thuộc tính menu còn trống nên bấm mũi tên không có gì xảy ra; chạy trên macOS 12 trở xuống, nơi NSComboButton không tồn tại và cần phương án dự phòng bằng popup button. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSComboButton",
    "note": "macOS 13 trở lên"
   },
   {
    "lang": "AppKit",
    "text": "NSComboButton.Style.split",
    "note": "vùng hành động và vùng menu tách riêng"
   },
   {
    "lang": "SwiftUI",
    "text": "Button + Menu",
    "note": "SwiftUI không có control gốc đơn lẻ tương đương"
   }
  ],
  "see": [
   "macos/popup-pulldown-combo",
   "macos/toolbar",
   "macos/context-menu"
  ]
 },
 "macos/context-menu": {
  "lead": "Menu hiện ngay tại con trỏ chuột là context menu — hãy bấm chuột phải (hoặc bấm) vào thư mục để bật/tắt nó",
  "sym": [
   "NSMenu",
   "View.contextMenu(menuItems:)"
  ],
  "aka": [
   "contextual menu",
   "right-click menu",
   "shortcut menu"
  ],
  "def": "Context menu đưa ra những hành động liên quan đến đối tượng nằm dưới con trỏ, và được mở bằng thao tác bấm phụ (chuột phải) hoặc Control-click. Nó hiện ra gần chỗ vừa bấm và được dựng từ các menu item chuẩn, đường phân cách, phím tắt tương đương và submenu. Dropdown menu thì có sẵn một control nhìn thấy được để bấm chính mở ra, còn context menu được gọi thẳng từ chính nội dung.",
  "phrases": [
   "menu hiện ra khi bấm chuột phải",
   "bấm giữ Control để ra các tuỳ chọn cho thứ đang trỏ vào",
   "menu hành động nhỏ cạnh mục đang chọn",
   "menu copy / đổi tên / xoá ngay dưới chuột",
   "menu mở ra từ cú bấm phụ"
  ],
  "anatomy": [
   {
    "n": "Selection highlight",
    "sym": "NSMenuItem",
    "d": "“Thanh màu xanh nằm sau lựa chọn đang trỏ tới” là selection highlight (vệt sáng chọn) của menu item."
   },
   {
    "n": "Separator item",
    "sym": "NSMenuItem.separator()",
    "d": "“Đường kẻ nhỏ giữa các nhóm tuỳ chọn khi bấm chuột phải” là separator item (mục phân cách)."
   },
   {
    "n": "Key equivalent",
    "sym": "NSMenuItem.keyEquivalent",
    "d": "“Chữ chỉ phím tắt nằm bên phải” là key equivalent (phím tắt tương đương) của mục đó."
   },
   {
    "n": "Submenu indicator",
    "sym": "NSMenuItem.submenu",
    "d": "“Mũi tên nằm ngang mở thêm lựa chọn” là submenu indicator (dấu hiệu menu con)."
   }
  ],
  "prompt": "Hãy thêm một Context Menu bằng NSMenu trên NSView đích (trong SwiftUI: View.contextMenu), mở bằng chuột phải hoặc Control-click tại mục đang nằm dưới con trỏ. Điền vào đó các hành động riêng cho mục ấy; đừng biến nó thành dropdown mở bằng cú bấm chính gắn vào một nút.",
  "debug": "Hãy gỡ lỗi context menu macOS của tôi (NSMenu, menu(for:), SwiftUI .contextMenu). Loại trừ lần lượt các khả năng: menu chỉ dựng một lần rồi lỗi thời — cần cài menuNeedsUpdate/menuWillOpen; các mục bị mờ đi vì target là nil và không có gì trong responder chain cài đặt action đó; chuột phải, control-click và chạm hai ngón đi qua các nhánh code khác nhau; .contextMenu của SwiftUI nuốt mất các cú bấm thường trên dòng. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSMenu"
   },
   {
    "lang": "SwiftUI",
    "text": "View.contextMenu(menuItems:)"
   },
   {
    "lang": "AppKit",
    "text": "NSView.menu",
    "note": "menu ngữ cảnh gắn với một view"
   },
   {
    "lang": "AppKit",
    "text": "NSMenuItem"
   }
  ],
  "see": [
   "macos/popover",
   "macos/popup-pulldown-combo",
   "macos/menu-bar-extra",
   "macos/focus-ring",
   "web/cascading-menus"
  ]
 },
 "macos/disclosure-triangle": {
  "lead": "Tam giác xám nhỏ bên trái mỗi thư mục là disclosure triangle — bấm vào và xem nó xoay",
  "sym": [
   "NSOutlineView",
   "DisclosureGroup"
  ],
  "aka": [
   "disclosure control",
   "outline disclosure button",
   "expand-collapse triangle"
  ],
  "def": "Disclosure triangle là dấu hiệu gọn nằm cạnh một dòng outline hoặc nhãn một mục, dùng để bung phần nội dung lồng bên trong. Khi đang thu lại nó chỉ sang ngang, và xoay xuống dưới khi được bung ra. NSOutlineView cung cấp sẵn các control bung/thu cho những dòng phân cấp, còn DisclosureGroup mang cùng mẫu bung-thu ấy sang SwiftUI.",
  "phrases": [
   "cái tam giác tí hon để mở một dòng thư mục",
   "mũi tên nhỏ xoay khi một mục được bung ra",
   "dấu chevron cạnh dòng có con",
   "mũi tên bung/thu nhỏ trong danh sách phân cấp",
   "tam giác cạnh tiêu đề để hiện thêm nội dung"
  ],
  "anatomy": [
   {
    "n": "Disclosure indicator",
    "sym": "NSButton.BezelStyle.disclosure",
    "d": "“Cái tam giác tí hon cạnh dòng” là disclosure indicator (dấu hiệu bung/thu)."
   },
   {
    "n": "Collapsed state",
    "sym": "DisclosureGroup.isExpanded",
    "d": "“Mũi tên chỉ sang ngang trước khi mở” là collapsed state (trạng thái thu lại)."
   },
   {
    "n": "Expanded state",
    "sym": "DisclosureGroup.isExpanded",
    "d": "“Mũi tên xoay xuống sau khi mở” là expanded state (trạng thái bung ra)."
   }
  ],
  "prompt": "Hãy dùng Disclosure Triangle gốc cho các dòng có thể bung ra: NSOutlineView cho cây outline phân cấp, hoặc DisclosureGroup của SwiftUI cho một mục đứng riêng. Dấu hiệu nhỏ phải xoay qua lại giữa trạng thái thu và bung, đồng thời các mục con của dòng hiện ngay bên dưới nó.",
  "debug": "Hãy gỡ lỗi disclosure triangle macOS của tôi (NSButton với bezel .disclosure, SwiftUI DisclosureGroup). Loại trừ lần lượt các khả năng: binding isExpanded thực ra không điều khiển phần nội dung được hiện; nhiều group dùng chung một binding nên cùng bung/thu một lúc; tam giác xoay sai chiều vì trạng thái và góc xoay được đặt tách rời nhau; tam giác và nhãn của nó lệch baseline. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSOutlineView"
   },
   {
    "lang": "SwiftUI",
    "text": "DisclosureGroup"
   },
   {
    "lang": "AppKit",
    "text": "NSButton.BezelStyle.disclosure",
    "note": "kiểu nút bung/thu đứng riêng"
   }
  ],
  "see": [
   "macos/sidebar",
   "web/accordion",
   "macos/context-menu"
  ]
 },
 "macos/dock-badge": {
  "lead": "Bong bóng đỏ hiện số đếm là Dock badge; còn việc icon nhảy lên là dock bounce",
  "sym": [
   "NSDockTile.badgeLabel",
   "NSApplication.dockTile"
  ],
  "aka": [
   "Dock tile badge",
   "app icon badge",
   "notification badge"
  ],
  "def": "Dock badge là cái nhãn đỏ nhỏ phủ lên icon của ứng dụng trong Dock, thường dùng để hiện số mục chưa đọc hoặc đang chờ. Nhãn này thuộc về NSDockTile của app và cũng có thể chứa một đoạn chữ trạng thái ngắn. Việc yêu cầu sự chú ý của người dùng khiến icon trong Dock nảy lên; đó là một tín hiệu riêng, gây gián đoạn nhiều hơn, nên chỉ dùng thật tiết kiệm.",
  "phrases": [
   "bong bóng số màu đỏ trên icon ở Dock",
   "số chưa đọc nằm trên icon app trong Dock",
   "cái nhãn đỏ nhỏ ở góc icon ứng dụng Mac",
   "huy hiệu số cho biết có thông báo đang chờ",
   "chấm đỏ hoặc con số trên icon ở Dock"
  ],
  "anatomy": [
   {
    "n": "Badge label",
    "sym": "NSDockTile.badgeLabel",
    "d": "“Bong bóng số đỏ trên icon ứng dụng” là badge label (nhãn huy hiệu) của Dock tile."
   },
   {
    "n": "Attention bounce",
    "sym": "NSApplication.requestUserAttention(_:)",
    "d": "“Icon app nhảy lên trong Dock” là attention bounce (cú nảy gây chú ý), và nó không phải một phần của badge."
   }
  ],
  "prompt": "Hãy hiển thị Dock Badge bằng cách gán con số vào NSApp.dockTile.badgeLabel, và xoá nhãn đi khi không còn số nào để hiện. Nếu cần thu hút mạnh hơn, hãy gọi NSApplication.requestUserAttention(_:) một cách riêng để icon Dock nảy lên; cú nảy đó không phải là bản thân badge.",
  "debug": "Hãy gỡ lỗi Dock badge macOS của tôi (NSDockTile.badgeLabel, NSApp.dockTile). Loại trừ lần lượt các khả năng: xoá bằng chuỗi “0” thay vì nil hoặc chuỗi rỗng nên số 0 vẫn hiện; đặt badge từ một background thread; mong badge còn sau khi thoát app — thực tế nó chỉ tồn tại lúc app đang chạy (các API badge của UNUserNotificationCenter thì được giữ lại); chuỗi quá dài bị cắt bớt trong tile. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSDockTile.badgeLabel"
   },
   {
    "lang": "AppKit",
    "text": "NSApplication.dockTile"
   },
   {
    "lang": "AppKit",
    "text": "NSApplication.requestUserAttention(_:)",
    "note": "làm icon Dock nảy lên; tách biệt với badge"
   },
   {
    "lang": "AppKit",
    "text": "NSApplication.RequestUserAttentionType"
   }
  ],
  "see": [
   "web/badge-chip-pill",
   "macos/menu-bar-extra",
   "web/toast"
  ]
 },
 "macos/focus-ring": {
  "lead": "Vầng sáng xanh quanh control đang được focus là focus ring",
  "sym": [
   "NSView.focusRingType",
   "NSWindow.makeFirstResponder(_:)"
  ],
  "aka": [
   "keyboard focus indicator",
   "focus halo",
   "first responder ring"
  ],
  "def": "Focus ring là vầng sáng mang màu accent, thường là xanh, bao quanh control đang nhận thao tác bàn phím. Ô nhập văn bản vốn dĩ nhận focus, còn Full Keyboard Access cho phép phím Tab dời focus qua cả những control khác như button và pop-up button. AppKit vẽ vòng này cho first responder theo giá trị focusRingType của nó, và các layout tự dựng phải chừa đủ khoảng trống để vòng đó còn nhìn thấy được.",
  "phrases": [
   "vầng sáng xanh quanh control đang chọn",
   "đường viền hiện ra khi nhấn Tab tới một nút",
   "viền xanh quanh ô đang giữ focus bàn phím",
   "vệt nhấn cho biết chữ gõ vào sẽ đi đâu",
   "cái vòng quanh các nút khi bật full keyboard access"
  ],
  "anatomy": [
   {
    "n": "First responder",
    "sym": "NSWindow.firstResponder",
    "d": "Câu “control sắp nhận những gì tôi gõ” chỉ first responder (đối tượng nhận sự kiện đầu tiên) của cửa sổ."
   }
  ],
  "prompt": "Hãy giữ nguyên Focus Ring gốc quanh first responder. Trong AppKit, làm cho control đủ điều kiện trở thành first responder, chuyển focus bằng NSWindow.makeFirstResponder(_:), và để NSView.focusRingType ở .default; trong SwiftUI thì dùng View.focusable(_:) cùng FocusState. Chừa đủ chỗ cho vòng màu accent chuẩn của macOS và đừng thay nó bằng một đường viền tự chế.",
  "debug": "Hãy gỡ lỗi focus ring macOS của tôi (NSView.focusRingType, SwiftUI .focusable/.focusEffectDisabled). Loại trừ lần lượt các khả năng: Full Keyboard Access (AppleKeyboardUIMode) trên máy Mac của người dùng khiến mọi control đầu tiên đều chiếm focus và hiện vòng; focusRingType = .none bị vô hiệu bởi một drawFocusRingMask tự viết; vòng bị cắt bởi một view tổ tiên đang clip theo bounds; trạng thái focus của SwiftUI giằng co với một lệnh makeFirstResponder tường minh. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSView.focusRingType"
   },
   {
    "lang": "AppKit",
    "text": "NSWindow.makeFirstResponder(_:)"
   },
   {
    "lang": "AppKit",
    "text": "NSFocusRingType"
   },
   {
    "lang": "SwiftUI",
    "text": "View.focusable(_:)"
   },
   {
    "lang": "SwiftUI",
    "text": "FocusState"
   }
  ],
  "see": [
   "macos/segmented-control",
   "macos/stepper",
   "macos/traffic-lights",
   "web/focus-ring-web"
  ]
 },
 "macos/insertion-caret": {
  "lead": "Hãy bấm vào ô nhập — vạch xanh nhấp nháy giữa các chữ là insertion caret",
  "sym": [
   "NSTextView.insertionPointColor",
   "NSTextView.selectedRange"
  ],
  "aka": [
   "insertion point",
   "text caret",
   "text cursor",
   "typing caret"
  ],
  "def": "Câu “cái vạch nhấp nháy ở chỗ tôi đang gõ” nói về insertion caret, còn gọi là insertion point (điểm chèn). Nó nằm bên trong văn bản có thể sửa và đánh dấu nơi ký tự tiếp theo sẽ xuất hiện. Nó không phải con trỏ chuột hình chữ I vốn di chuyển theo chuột, cũng không phải mấy dấu chấm động báo hiệu có người khác đang gõ.",
  "phrases": [
   "cái vạch nhấp nháy ở chỗ tôi đang gõ",
   "thanh dọc nhỏ nằm trong ô nhập chữ",
   "con trỏ nhấp nháy giữa các chữ cái",
   "đường kẻ cho biết ký tự kế tiếp sẽ nằm ở đâu",
   "dấu hiệu đang gõ ngay trong ô nhập",
   "cái vạch nhấp nháy trong ô giờ",
   "con trỏ văn bản vẫn nằm đó sau khi tôi bấm vào ô"
  ],
  "anatomy": [
   {
    "n": "Insertion caret",
    "sym": "NSTextView.insertionPointColor",
    "d": "Vạch mảnh nhấp nháy giữa các ký tự chính là insertion caret."
   }
  ],
  "prompt": "Hãy hiển thị text insertion caret (trong AppKit: NSTextView.insertionPointColor) dưới dạng vạch dọc mảnh nhấp nháy tại selectedRange có độ dài bằng 0, đúng chỗ ký tự gõ tiếp theo sẽ xuất hiện; trên web thì tạo kiểu cho chính điểm ảnh đó bằng CSS caret-color.",
  "debug": "Hãy gỡ lỗi text insertion caret của tôi (NSTextView.insertionPointColor, selectedRange). Loại trừ lần lượt các khả năng: ô nhập chưa phải first responder; vùng chọn có độ dài khác không nên không còn một điểm chèn duy nhất; phần vẽ chữ tự viết đè lên caret; màu caret không đủ tương phản; focus bị một view khác chuyển đi mất. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSTextView.insertionPointColor"
   },
   {
    "lang": "AppKit",
    "text": "NSTextView.selectedRange",
    "note": "vùng chọn dài 0 chính là điểm chèn"
   },
   {
    "lang": "AppKit",
    "text": "NSTextView.drawInsertionPoint(in:color:turnedOn:)"
   },
   {
    "lang": "CSS",
    "text": "caret-color"
   }
  ],
  "see": [
   "macos/pointer",
   "web/text-animations"
  ]
 },
 "macos/inspector": {
  "lead": "Bảng chi tiết bên phải là inspector — bật/tắt nó từ thanh công cụ",
  "sym": [
   "View.inspector(isPresented:content:)",
   "View.inspectorColumnWidth(min:ideal:max:)"
  ],
  "aka": [
   "inspector panel",
   "details sidebar",
   "properties inspector",
   "utility area"
  ],
  "def": "Inspector là một panel nằm ở cạnh cuối (bên phải), hiển thị thuộc tính và các control của mục đang được chọn trong phần nội dung chính. Những app như Keynote và Xcode gom các control về định dạng, nhận diện và cấu hình vào inspector, nhờ đó tài liệu vẫn hiện rõ trong khi phần chi tiết thay đổi. Từ macOS 14, SwiftUI có sẵn một modifier inspector riêng; còn bố cục AppKit kiểu cổ điển thường dựng nó thành phần tử cuối của một split view.",
  "phrases": [
   "bảng thuộc tính ở bên phải",
   "thanh bên phải đổi nội dung theo mục đang chọn",
   "bảng định dạng kiểu Keynote",
   "bảng của Xcode hiện chi tiết cho thứ đang chọn",
   "cột cài đặt thu gọn được ở bên phải"
  ],
  "anatomy": [
   {
    "n": "Inspector column",
    "sym": "View.inspector(isPresented:content:)",
    "d": "“Bảng thuộc tính bên phải” là inspector column (cột inspector)."
   },
   {
    "n": "Inspector section disclosure",
    "sym": "DisclosureGroup",
    "d": "“Mũi tên nhỏ để gấp một nhóm cài đặt lại” là inspector section disclosure (nút bung/thu của từng mục trong inspector)."
   },
   {
    "n": "Inspector column divider",
    "sym": "NSSplitViewItem",
    "d": "“Đường mảnh bạn kéo để đổi cỡ bảng thuộc tính” là inspector column divider (vạch chia của cột inspector)."
   }
  ],
  "prompt": "Hãy đặt các control phụ thuộc vào mục đang chọn này vào một Inspector, dùng View.inspector(isPresented:content:) của SwiftUI (macOS 14+), làm thành một cột bên phải thu gọn được với inspectorColumnWidth hợp lý. Inspector phải cập nhật theo đối tượng đang chọn mà không thay thế nội dung chính.",
  "debug": "Hãy gỡ lỗi inspector macOS của tôi (SwiftUI View.inspector(isPresented:), NSSplitViewItem(inspectorWithViewController:)). Loại trừ lần lượt các khả năng: inspector tự hiện thành sheet khi cửa sổ hẹp — đó là hành vi thích ứng có sẵn; binding của nút bật/tắt bị lệch vì người dùng còn có thể đóng nó bằng cách kéo; độ rộng min/ideal ép nó thu lại khi đổi cỡ cửa sổ; nội dung inspector không bám theo mục đang chọn. Triệu chứng là:",
  "code": [
   {
    "lang": "SwiftUI",
    "text": "View.inspector(isPresented:content:)",
    "note": "macOS 14 trở lên"
   },
   {
    "lang": "SwiftUI",
    "text": "View.inspectorColumnWidth(min:ideal:max:)"
   },
   {
    "lang": "AppKit",
    "text": "NSSplitViewController",
    "note": "nền tảng phổ biến cho một inspector cổ điển nằm bên phải"
   },
   {
    "lang": "AppKit",
    "text": "NSSplitViewItem"
   }
  ],
  "see": [
   "macos/sidebar",
   "macos/toolbar",
   "macos/vibrancy",
   "macos/disclosure-triangle"
  ]
 },
 "macos/level-indicator": {
  "lead": "Ngôi sao đánh giá và thanh dung lượng cùng thuộc một họ control: level indicator",
  "sym": [
   "NSLevelIndicator",
   "NSLevelIndicator.Style"
  ],
  "aka": [
   "level meter",
   "capacity indicator",
   "rating indicator",
   "relevancy indicator"
  ],
  "def": "Level indicator cho biết một giá trị nằm ở đâu trong một khoảng đã biết, chứ không phải tiến độ của một tác vụ đang chạy. Các kiểu gốc của nó gồm thanh dung lượng liền hoặc chia đoạn, thang đánh giá bằng biểu tượng như ngôi sao, và đồng hồ đo mức liên quan gọn nhỏ. Có thể đặt ngưỡng cảnh báo và ngưỡng nguy cấp để màu của thanh dung lượng đổi khi giá trị vượt qua chúng.",
  "phrases": [
   "hàng ngôi sao để chấm điểm",
   "thanh chia đoạn cho thấy dung lượng ổ đĩa",
   "cái đồng hồ nhỏ cho biết độ khớp mạnh đến đâu",
   "thanh đổi màu ở mức cảnh báo và mức nguy cấp",
   "đồng hồ đo của Mac có vạch chia và các dải màu"
  ],
  "anatomy": [
   {
    "n": "Filled level",
    "sym": "NSLevelIndicator.doubleValue",
    "d": "“Phần được tô màu bên trong đồng hồ nhỏ” là filled level (mức đã lấp đầy)."
   },
   {
    "n": "Warning threshold",
    "sym": "NSLevelIndicator.warningValue",
    "d": "“Điểm mà đồng hồ chuyển sang màu cảnh báo” là warning threshold (ngưỡng cảnh báo)."
   },
   {
    "n": "Critical threshold",
    "sym": "NSLevelIndicator.criticalValue",
    "d": "“Điểm mà thanh chuyển sang trạng thái nguy cấp” là critical threshold (ngưỡng nguy cấp)."
   },
   {
    "n": "Rating symbol",
    "sym": "NSLevelIndicator.Style.rating",
    "d": "“Từng ngôi sao trong hàng đánh giá” là một rating symbol (biểu tượng đánh giá) của level indicator."
   }
  ],
  "prompt": "Hãy dùng NSLevelIndicator với kiểu khớp đúng ý nghĩa: .continuousCapacity hoặc .discreteCapacity cho mức có giới hạn, .rating cho ngôi sao, hoặc .relevancy cho độ mạnh của sự khớp. Cấu hình warningValue và criticalValue để có cách tô màu theo ngưỡng kiểu gốc; thứ gần nhất mang tính tổng quát trong SwiftUI là Gauge.",
  "debug": "Hãy gỡ lỗi level indicator macOS của tôi (NSLevelIndicator). Loại trừ lần lượt các khả năng: chọn sai kiểu — dung lượng liên tục, vạch rời rạc và sao đánh giá thực ra là cùng một class với các giá trị levelIndicatorStyle khác nhau; ngưỡng cảnh báo và nguy cấp tô lại phần lấp đầy ngoài ý muốn; isEditable cho phép bấm đổi giá trị trong khi đáng lẽ chỉ để hiển thị; giá trị đổi mà không có hiệu ứng chuyển vì cell vẽ lại tức thì. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSLevelIndicator"
   },
   {
    "lang": "AppKit",
    "text": "NSLevelIndicator.Style"
   },
   {
    "lang": "SwiftUI",
    "text": "Gauge"
   }
  ],
  "see": [
   "macos/segmented-control",
   "macos/focus-ring",
   "web/badge-chip-pill",
   "web/pie-donut-chart"
  ]
 },
 "macos/menu-bar-extra": {
  "lead": "Viên thuốc nhạt màu phía sau ★ là highlighted state — bấm vào icon để bật/tắt nó",
  "sym": [
   "NSStatusItem",
   "MenuBarExtra"
  ],
  "aka": [
   "status item",
   "menu bar icon",
   "menu bar app",
   "status bar item",
   "tray icon (Windows term)"
  ],
  "def": "Menu bar extra là icon nhỏ nằm ở phía phải của menu bar macOS, cạnh đồng hồ — Wi-Fi, pin và các app bên thứ ba đều ở chỗ này. Trong AppKit nó là một NSStatusItem; còn SwiftUI gọi cả cấu trúc đó là MenuBarExtra. Khi bạn bấm vào một cái, nút của nó chuyển sang highlighted state — một nền bo tròn màu nhạt, giữ nguyên suốt lúc menu hoặc popover còn mở rồi mờ đi khi menu đóng lại.",
  "phrases": [
   "cái icon ở góc trên bên phải của thanh menu Mac",
   "nền nhạt hiện sau icon trên thanh menu khi bấm vào",
   "trạng thái được tô sáng khi menu của icon trên thanh menu đang mở",
   "icon nhỏ cạnh đồng hồ trên Mac",
   "icon khay hệ thống trên Mac",
   "icon app ở trên cùng màn hình, bấm vào xổ ra dropdown"
  ],
  "anatomy": [
   {
    "n": "Template icon",
    "sym": "NSImage.isTemplate",
    "d": "“Icon đơn sắc tự đổi màu” là một template icon."
   },
   {
    "n": "Highlighted state",
    "sym": "NSStatusBarButton.isHighlighted",
    "d": "“Phần phía sau icon trên menu bar được tô sáng lên” là highlighted state của nút status."
   },
   {
    "n": "Attached menu or popover",
    "sym": "NSStatusItem.menu",
    "d": "“Cửa sổ thật sự mở ra từ menu bar” là menu hoặc popover được gắn vào status item."
   }
  ],
  "prompt": "Hãy thêm một menu bar extra — tức một NSStatusItem trên menu bar của macOS (trong SwiftUI: MenuBarExtra). Trong lúc menu hoặc popover của nó còn mở, nút của status item phải hiện highlighted state: nền bo tròn màu nhạt (NSStatusBarButton.isHighlighted), giống hệt các icon menu bar của hệ thống.",
  "debug": "Hãy gỡ lỗi menu bar extra macOS của tôi (NSStatusItem, SwiftUI MenuBarExtra). Loại trừ lần lượt các khả năng: status item bị giải phóng bộ nhớ vì không có gì giữ tham chiếu tới nó; icon không theo menu bar tối vì ảnh chưa được đánh dấu là template; item bị ẩn lặng lẽ khi menu bar hết chỗ; vệt sáng của nút bị kẹt vì isHighlighted bị quản lý thủ công; kiểu cửa sổ của MenuBarExtra hoạt động khác với kiểu menu. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSStatusItem"
   },
   {
    "lang": "SwiftUI",
    "text": "MenuBarExtra",
    "note": "macOS 13 trở lên"
   },
   {
    "lang": "AppKit",
    "text": "NSStatusBar.system.statusItem(withLength:)",
    "note": "cách tạo ra một status item"
   },
   {
    "lang": "AppKit",
    "text": "NSStatusBarButton.isHighlighted",
    "note": "nền bo tròn nhạt màu khi menu của nó đang mở"
   }
  ],
  "see": [
   "macos/popover",
   "macos/context-menu",
   "macos/vibrancy"
  ]
 },
 "macos/menu-bar": {
  "lead": "Rê chuột lên một con số để biết đó là bộ phận nào",
  "sym": [
   "NSApp.mainMenu",
   "NSStatusBar.system"
  ],
  "aka": [
   "menubar",
   "system menu bar",
   "top bar"
  ],
  "def": "Menu bar là dải mờ trong suốt chạy ngang phía trên màn hình Mac. Bên trái là menu Apple do hệ thống sở hữu, rồi đến main menu của ứng dụng đang ở phía trước; bên phải là các menu bar extra, sau đó là các status item của hệ thống và đồng hồ. Mỗi thành phần bên dưới đều có tên gọi chính thức riêng; hãy rê chuột lên một con số để thấy chính xác nó chỉ bộ phận nào.",
  "phrases": [
   "thanh nằm trên cùng màn hình Mac",
   "dải có logo Apple và đồng hồ",
   "thanh trên cùng của Mac chứa menu của ứng dụng",
   "chỗ có biểu tượng wifi và pin",
   "cái hiện File Edit View ở phía trên"
  ],
  "anatomy": [
   {
    "n": "App menus (main menu)",
    "sym": "NSApp.mainMenu",
    "d": "“Các menu File Edit View ở trên cùng” có một tên gọi chính thức: main menu của ứng dụng."
   },
   {
    "n": "Menu bar extra (status item)",
    "sym": "NSStatusItem",
    "d": "“Biểu tượng nhỏ cạnh đồng hồ” là một status item nằm trong NSStatusBar.system; SwiftUI gọi nó là MenuBarExtra."
   },
   {
    "n": "Template icon",
    "sym": "NSImage.isTemplate",
    "d": "Hình glyph đơn sắc tự đổi màu theo menu bar sáng hay tối — đó là template image, thường là một SF Symbol."
   },
   {
    "n": "Highlighted state",
    "sym": "NSStatusBarButton.isHighlighted",
    "d": "Viên thuốc bo tròn màu nhạt nằm sau icon khi menu hoặc popover của nó đang mở — điểm ảnh khó tả nhất trong trang này."
   },
   {
    "n": "Menu",
    "sym": "NSMenu",
    "d": "“Cái dropdown” xổ ra từ một icon trên menu bar là một NSMenu — trong mờ, bo góc, có nền vibrancy."
   },
   {
    "n": "Selection highlight (menu item)",
    "sym": "NSMenuItem",
    "d": "“Thanh xanh khi rê chuột lên một lựa chọn”: đó là selection highlight của menu item, được nhuộm theo màu accent của hệ thống."
   },
   {
    "n": "Separator item",
    "sym": "NSMenuItem.separator()",
    "d": "“Đường kẻ nhỏ giữa các lựa chọn” là một separator item."
   },
   {
    "n": "Key equivalent",
    "sym": "NSMenuItem.keyEquivalent",
    "d": "“Chữ ⌘Q ở bên phải một lựa chọn trong menu” là key equivalent của mục đó."
   }
  ],
  "prompt": "Hãy làm việc với menu bar của macOS: main menu của app (NSApp.mainMenu) nằm bên trái sau menu Apple; các menu bar extra (NSStatusItem trong NSStatusBar.system) nằm bên phải, trước đồng hồ. Dùng đúng tên từng bộ phận: status item, trạng thái highlighted của nó, NSMenu, NSMenuItem, separator item.",
  "debug": "Hãy gỡ lỗi menu bar macOS của tôi (NSMenu main menu, NSMenuItem). Loại trừ lần lượt các khả năng: các mục bị mờ vĩnh viễn vì action của chúng không có target và không có gì trong responder chain cài đặt nó; đã tắt tự động bật/tắt mục (autoenablesItems) mà không kiểm tra thủ công; phím tắt đã khai báo nhưng không bao giờ chạy vì mục bị vô hiệu ngay lúc validate; tiêu đề menu của app lấy từ tên hiển thị của bundle chứ không phải từ code. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSApp.mainMenu",
    "note": "các menu của app ở bên trái"
   },
   {
    "lang": "AppKit",
    "text": "NSStatusBar.system",
    "note": "vùng icon ở bên phải"
   },
   {
    "lang": "SwiftUI",
    "text": "MenuBarExtra",
    "note": "một icon ở phía phải, macOS 13 trở lên"
   }
  ],
  "see": [
   "macos/menu-bar-extra",
   "macos/context-menu",
   "macos/vibrancy",
   "web/header-navbar"
  ]
 },
 "macos/outline-view": {
  "lead": "Các dòng thụt vào và bung ra được thì đây là outline view, không phải list thường",
  "sym": [
   "NSOutlineView",
   "OutlineGroup"
  ],
  "aka": [
   "tree view",
   "hierarchical list",
   "outline list",
   "expandable table"
  ],
  "def": "Outline view là danh sách có hình cây: các dòng có thể chứa dòng con, độ thụt lề cho thấy chiều sâu, và các disclosure triangle bung hoặc thu từng nhánh. Một list thường thì không có phân cấp. Source list là kiểu giao diện sidebar kèm quy ước điều hướng, có thể được cài đặt bằng outline view, nhưng hai thuật ngữ này không dùng thay cho nhau được.",
  "phrases": [
   "danh sách thụt vào có các mũi tên bung nhỏ",
   "cây thư mục mà mỗi dòng đều có thể có con",
   "danh sách có các dòng lồng nhau, mở ra đóng lại được",
   "danh sách trông như sidebar có nhiều tầng cấp bậc",
   "các dòng bung được thụt vào dưới dòng cha"
  ],
  "anatomy": [
   {
    "n": "Disclosure triangle",
    "sym": "NSOutlineView",
    "d": "“Mũi tên bung nhỏ cạnh một dòng” chính là disclosure triangle của dòng đó."
   },
   {
    "n": "Indentation level",
    "sym": "NSOutlineView.level(forItem:)",
    "d": "“Mức dòng con lùi vào bao xa so với dòng cha” là indentation level (mức thụt lề) của nó."
   },
   {
    "n": "Row selection highlight",
    "sym": "NSTableRowView.isSelected",
    "d": "“Dải màu nằm sau dòng hiện tại” là row selection highlight (vệt sáng chọn dòng)."
   }
  ],
  "prompt": "Hãy dùng Outline View với NSOutlineView (SwiftUI: OutlineGroup) cho danh sách phân cấp thụt lề: các dòng cha có disclosure triangle, và bung một dòng ra thì các dòng con hiện ngay bên dưới nó. Chỉ dùng list phẳng khi các dòng không có con; nếu outline đóng vai trò sidebar thì áp kiểu source-list một cách riêng.",
  "debug": "Hãy gỡ lỗi outline view macOS của tôi (NSOutlineView). Loại trừ lần lượt các khả năng: dòng không chịu bung vì câu trả lời của isItemExpandable và của delegate đếm số con mâu thuẫn nhau; reloadItem mà không có reloadChildren:true nên con cũ còn sót lại; autosaveExpandedItems hỏng ngầm vì các item thiếu định danh ổn định cho vòng đi-về persistentObject; hiệu ứng chuyển dòng bị giật vì model đã bị đổi trước khi lần cập nhật có animation chạy. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSOutlineView"
   },
   {
    "lang": "SwiftUI",
    "text": "OutlineGroup"
   },
   {
    "lang": "SwiftUI",
    "text": "List",
    "note": "khi được cấp dữ liệu con phân cấp"
   }
  ],
  "see": [
   "macos/disclosure-triangle",
   "macos/sidebar",
   "macos/column-view",
   "macos/scroll-view",
   "web/data-table"
  ]
 },
 "macos/panel": {
  "lead": "Cửa sổ nhỏ màu tối nổi trên mọi thứ là panel (kiểu HUD)",
  "sym": [
   "NSPanel",
   "NSWindow.StyleMask.nonactivatingPanel"
  ],
  "aka": [
   "floating panel",
   "utility panel",
   "HUD window",
   "heads-up display"
  ],
  "def": "Panel là cửa sổ phụ dành cho công cụ, các control hoặc thông tin tạm thời, chứ không phải tài liệu chính. Nó có thể nổi lên trên các cửa sổ thường, tự ẩn khi app của nó mất trạng thái hoạt động, hoặc dùng giao diện HUD. Một panel non-activating nhận được tương tác phù hợp mà không kéo cả ứng dụng lên phía trước, rất hợp với các trình khởi chạy lệnh và những bề mặt kiểu Spotlight.",
  "phrases": [
   "cửa sổ tiện ích nhỏ luôn nằm trên cửa sổ chính",
   "bảng điều khiển nổi trên Mac",
   "cửa sổ hiển thị tối màu, trong mờ, kiểu heads-up",
   "cửa sổ kiểu Spotlight không kích hoạt ứng dụng",
   "cửa sổ công cụ đi theo tài liệu đang làm việc"
  ],
  "anatomy": [
   {
    "n": "Floating window level",
    "sym": "NSWindow.Level.floating",
    "d": "“Cửa sổ tiện ích luôn nằm trên tài liệu” dùng floating window level (tầng cửa sổ nổi)."
   },
   {
    "n": "HUD chrome",
    "sym": "NSWindow.StyleMask.hudWindow",
    "d": "“Khung trong mờ màu tối kiểu heads-up-display” là HUD chrome."
   }
  ],
  "prompt": "Hãy hiện thực bề mặt phụ này thành một Panel (Floating Window / HUD) bằng NSPanel, dùng NSWindow.Level.floating để nó luôn nằm trên các cửa sổ tài liệu liên quan. Nếu nó cần hành xử như Spotlight thì dùng kiểu nonactivatingPanel, để việc hiện nó không kích hoạt app và không giành focus một cách không cần thiết.",
  "debug": "Hãy gỡ lỗi panel macOS của tôi (NSPanel). Loại trừ lần lượt các khả năng: panel giành focus của cửa sổ chính vì thiếu style mask nonactivatingPanel; các ô nhập bên trong không nhận chữ vì panel không thể trở thành key; panel biến mất khi app mất kích hoạt do hidesOnDeactivate; tầng cửa sổ floating đụng độ với các cửa sổ luôn-nằm-trên khác. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSPanel"
   },
   {
    "lang": "AppKit",
    "text": "NSWindow.StyleMask.nonactivatingPanel",
    "note": "cho phép một panel không kích hoạt app của nó"
   },
   {
    "lang": "AppKit",
    "text": "NSWindow.StyleMask.hudWindow",
    "note": "giao diện panel kiểu heads-up-display"
   },
   {
    "lang": "AppKit",
    "text": "NSWindow.Level.floating"
   },
   {
    "lang": "AppKit",
    "text": "NSPanel.becomesKeyOnlyIfNeeded"
   }
  ],
  "see": [
   "macos/sheet",
   "macos/popover",
   "macos/vibrancy",
   "web/command-palette"
  ]
 },
 "macos/pointer": {
  "lead": "Hãy rê chuột qua một thẻ — con trỏ của chính bạn sẽ đổi thành hình đó. “Con trỏ chữ có hai đầu nhỏ ở trên và dưới” chính là I-beam.",
  "sym": [
   "NSCursor",
   "NSCursor.iBeam"
  ],
  "aka": [
   "cursor",
   "mouse pointer",
   "mouse cursor"
  ],
  "def": "Mỗi hình dạng mà con trỏ Mac có thể mang đều có một tên gọi chính thức. “Con trỏ chữ có mấy cái chân nhỏ ở đầu và cuối” là I-beam; bàn tay khi lướt qua liên kết là pointing hand; biểu tượng cấm khi đang kéo thả là operation not allowed. AppKit đặt chúng thông qua NSCursor, và các view giành lấy từng vùng màn hình bằng cursor rect — khi con trỏ kẹt mãi ở sai hình dạng thì thủ phạm thường là một cursor rect đã cũ. (Quả “beach ball” cầu vồng không phải NSCursor: hệ thống hiện nó khi một app ngừng phản hồi.)",
  "phrases": [
   "con trỏ chữ có mấy cái chân nhỏ ở đầu và cuối",
   "chuột bị kẹt ở chế độ soạn văn bản",
   "mũi tên biến thành bàn tay khi lướt qua liên kết",
   "mũi tên hai đầu khi kéo đổi cỡ cửa sổ",
   "con trỏ có dấu cộng nhỏ khi kéo để sao chép",
   "chuột biến thành biển báo cấm",
   "con trỏ hình kính lúp có dấu cộng bên trong"
  ],
  "anatomy": [],
  "prompt": "Hãy đặt con trỏ macOS bằng NSCursor — ví dụ NSCursor.iBeam.set() — hoặc giành một vùng bằng NSView.addCursorRect(_:cursor:) bên trong resetCursorRects() (trong SwiftUI: View.pointerStyle(_:), macOS 15+). Nếu con trỏ cứ kẹt ở dạng I-beam sau khi chuột rời khỏi text view thì lỗi nằm ở cursor rect đã cũ: gọi window.invalidateCursorRects(for: view) để các rect được dựng lại.",
  "debug": "Hãy gỡ lỗi pointer/cursor macOS của tôi (NSCursor, NSTrackingArea). Loại trừ lần lượt các khả năng: con trỏ nhấp nháy quay về mũi tên vì cursor rect bị đặt lại mỗi lần layout — hãy điều khiển từ cursorUpdate cùng một tracking area thay vào đó; các lời gọi push/pop hoặc hide/unhide không cân bằng; quả beach ball xoay nghĩa là main thread đang bị chặn chứ không phải lỗi cursor; con trỏ bị ẩn mà không bao giờ được khôi phục sau một lần kéo. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSCursor"
   },
   {
    "lang": "AppKit",
    "text": "NSCursor.iBeam",
    "note": "con trỏ khi soạn văn bản"
   },
   {
    "lang": "AppKit",
    "text": "NSView.addCursorRect(_:cursor:)",
    "note": "giành một vùng; được gọi từ resetCursorRects()"
   },
   {
    "lang": "SwiftUI",
    "text": "View.pointerStyle(_:)",
    "note": "macOS 15+"
   },
   {
    "lang": "CSS",
    "text": "cursor: text",
    "note": "cùng các hình dạng đó trên web: pointer, grab, not-allowed…"
   }
  ],
  "see": [
   "macos/insertion-caret",
   "macos/search-field",
   "macos/context-menu",
   "macos/split-view",
   "macos/focus-ring"
  ]
 },
 "macos/popover": {
  "lead": "Bong bóng có mũi tên là một NSPopover — bấm nút để bật/tắt nó",
  "sym": [
   "NSPopover",
   "NSPopover.show(relativeTo:of:preferredEdge:)"
  ],
  "aka": [
   "anchored popover",
   "popover bubble",
   "callout"
  ],
  "def": "Popover là một bong bóng nổi nhẹ, chứa các control hoặc thông tin gắn với đúng một view nguồn. Mũi tên của nó chỉ ra control đã mở nó, và AppKit tự chọn cạnh sao cho bong bóng vẫn nằm gọn trong màn hình. Tuỳ theo behavior, nó có thể đóng lại khi người dùng thao tác chỗ khác, hoặc cứ mở cho tới khi bị đóng một cách tường minh.",
  "phrases": [
   "cái bong bóng nổi nhỏ có mũi tên",
   "cái hộp chỉ ngược về nút đã mở ra nó",
   "cửa sổ nhỏ gắn vào một nút trên thanh công cụ",
   "bảng hình bóng thoại neo vào một control",
   "bong bóng cài đặt nổi, bấm ra ngoài là đóng"
  ],
  "anatomy": [
   {
    "n": "Anchor arrow",
    "sym": "NSPopover.show(relativeTo:of:preferredEdge:)",
    "d": "“Mũi nhọn nhỏ của bong bóng hướng về phía nút” là anchor arrow (mũi tên neo). Lỗi kinh điển ở các popover tự dựng là mũi tên trông như một tam giác riêng dán thêm vào bong bóng — nó phải dùng đúng nền của bong bóng và che đường viền ở chỗ hai bên giáp nhau."
   },
   {
    "n": "Positioning rect",
    "sym": "NSPopover.show(relativeTo:of:preferredEdge:)",
    "d": "“Đúng phần của nút mà bong bóng gắn vào” là positioning rect (hình chữ nhật định vị)."
   }
  ],
  "prompt": "Hãy trình bày thứ này dưới dạng Popover bằng NSPopover (SwiftUI: View.popover), có anchor arrow nhìn thấy được, hướng đúng vào control đã mở nó. Mũi tên phải dùng đúng nền của bong bóng và hoà liền vào đó, không bao giờ trông như một tam giác rời. Nó phải luôn gắn trực quan với control ấy và đóng theo cách ứng xử popover gốc.",
  "debug": "Hãy gỡ lỗi popover macOS của tôi (NSPopover, SwiftUI View.popover). Loại trừ lần lượt các khả năng: behavior transient đóng nó ngay ở lần bấm đầu tiên bên trong nội dung tự dựng không nhận first responder; mũi tên neo vào một positioning rect đã cũ sau khi layout đổi; mũi tên tự vẽ trông như tam giác rời vì bị vẽ dưới đường viền hoặc bóng của bong bóng, hoặc dùng màu nền không khớp; popover tách ra thành cửa sổ nổi khi bị kéo (delegate detachable); popover SwiftUI hiện thành sheet trong các ngữ cảnh compact. Triệu chứng là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSPopover"
   },
   {
    "lang": "AppKit",
    "text": "NSPopover.show(relativeTo:of:preferredEdge:)",
    "note": "định vị popover và mũi tên neo của nó"
   },
   {
    "lang": "SwiftUI",
    "text": "View.popover(isPresented:attachmentAnchor:arrowEdge:content:)"
   },
   {
    "lang": "AppKit",
    "text": "NSPopover.Behavior"
   }
  ],
  "see": [
   "macos/menu-bar-extra",
   "macos/context-menu",
   "macos/vibrancy",
   "web/popover-dropdown-tooltip"
  ]
 },
 "macos/popup-pulldown-combo": {
  "lead": "gõ tuỳ ý hoặc chọn trong danh sách",
  "sym": [
   "NSPopUpButton",
   "NSComboBox"
  ],
  "aka": [
   "pop-up menu button",
   "pull-down menu button",
   "combo box",
   "menu picker"
  ],
  "def": "Pop-up button (nút thả xuống để chọn) thể hiện một lựa chọn đang có hiệu lực: khi đóng, nhãn của nó hiển thị giá trị hiện tại, còn khi mở ra thì liệt kê các giá trị có thể chọn. Pull-down button dùng chính NSPopUpButton nhưng đặt pullsDown là true; nhãn của nó đứng yên, và menu mở ra chứa các lệnh chứ không lưu lại một lựa chọn lâu dài. Combo box là sự kết hợp của ô nhập văn bản với danh sách thả xuống, nên người dùng có thể tự gõ một giá trị thay vì bị giới hạn trong các mục có sẵn.",
  "phrases": [
   "ô thả xuống hiển thị luôn tuỳ chọn đang được chọn",
   "cái nút có mũi tên nhỏ, bấm vào ra một menu các hành động",
   "ô nhập chữ có gắn thêm danh sách thả xuống",
   "nút menu kiểu Mac so với ô thả xuống cho gõ chữ vào",
   "bộ chọn trông như một nút bấm rồi bung ra các lựa chọn",
   "ô vừa gõ được vừa chọn được một giá trị có sẵn"
  ],
  "anatomy": [
   {
    "n": "Current-value label",
    "sym": "NSPopUpButton.titleOfSelectedItem",
    "d": "Khi ai đó nói \"dòng chữ trong ô thả xuống cho biết đang chọn gì\", họ đang chỉ vào current-value label của pop-up button."
   },
   {
    "n": "Pull-down indicator",
    "sym": "NSPopUpButton.pullsDown",
    "d": "\"Mũi tên nhỏ báo hiệu nút này mở ra các hành động\" chính là pull-down indicator."
   },
   {
    "n": "Editable value field",
    "sym": "NSComboBox",
    "d": "\"Ô thả xuống mà tôi gõ được giá trị riêng\" là phần ô nhập có thể chỉnh sửa của combo box."
   },
   {
    "n": "Selected-item checkmark",
    "sym": "NSMenuItem.state",
    "d": "\"Dấu tick cạnh lựa chọn hiện tại\" là dấu trạng thái (state) của menu item đang được chọn."
   }
  ],
  "prompt": "Hãy chọn đúng control trong bộ ba Pop-Up Button, Pull-Down Button và Combo Box. Dùng NSPopUpButton với pullsDown là false khi cần một lựa chọn được giữ lại; dùng cùng control đó với pullsDown là true khi cần một menu gồm các lệnh; dùng NSComboBox khi người dùng ngoài việc chọn còn được phép tự gõ giá trị. Giữ nguyên mũi tên native, cách menu hoạt động và ý nghĩa hiển thị giá trị của control đã chọn.",
  "debug": "Hãy giúp tôi gỡ lỗi popup/pull-down/combo trên macOS (NSPopUpButton, NSComboBox). Loại trừ lần lượt các khả năng sau: pull-down lấy mất menu item ĐẦU TIÊN làm tiêu đề, nên cần chèn một item giả ở vị trí đầu; lựa chọn của popup không đồng bộ vì sau khi dựng lại menu chưa gọi selectItem; autoenablesItems làm xám các item có action nhưng không có target; hiểu nhầm combo box là một menu, trong khi nó là ô nhập văn bản có kèm danh sách. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSPopUpButton",
    "note": "control chọn giá trị khi pullsDown là false"
   },
   {
    "lang": "AppKit",
    "text": "NSComboBox",
    "note": "ô nhập văn bản đi cùng danh sách các lựa chọn"
   },
   {
    "lang": "AppKit",
    "text": "NSPopUpButton.pullsDown",
    "note": "đặt true thì nó thành pull-down button thiên về hành động"
   },
   {
    "lang": "SwiftUI",
    "text": "Picker"
   }
  ],
  "see": [
   "macos/context-menu",
   "web/combobox",
   "macos/segmented-control",
   "web/popover-dropdown-tooltip",
   "macos/rule-editor"
  ]
 },
 "macos/rule-editor": {
  "lead": "Dấu − và + ở cuối mỗi hàng dùng để xoá hoặc thêm một hàng",
  "sym": [
   "NSPredicateEditor",
   "NSRuleEditor"
  ],
  "aka": [
   "predicate editor",
   "smart folder rules",
   "smart mailbox conditions",
   "query builder (web term)"
  ],
  "def": "\"Những hàng ô thả xuống có dấu − và + ở cuối\" là một rule editor (trình soạn quy tắc), trong AppKit là NSPredicateEditor. Bạn gặp các hàng này ở ô tìm kiếm và Smart Folders của Finder, Smart Mailboxes của Mail, Smart Playlists của Music: mỗi hàng là một điều kiện (kiểm tra cái gì, so sánh ra sao, giá trị bao nhiêu), nút − xoá hàng đó còn nút + thêm một hàng ngay bên dưới. Một hàng gộp (kiểu \"Tất cả các điều kiện sau đều đúng\") gom các hàng thụt vào dưới nó thành một nhóm; trong Music, giữ phím Option sẽ biến + thành nút mở một nhóm mới. Nó không phải stepper, tức cặp mũi tên lên xuống chỉnh một con số; cửa sổ Rules của Mail cũng dùng đúng kiểu hàng này để tạo tự động hoá, và trên web người ta gọi nó là query builder.",
  "phrases": [
   "các hàng ô thả xuống, cuối mỗi hàng có nút trừ và nút cộng",
   "tôi chọn được nhiều tiêu chí tìm kiếm trong các menu thả xuống và dựng ra lệnh tìm bằng giao diện thay vì gõ tay",
   "bộ lọc chọn một thuộc tính rồi chọn lớn hơn hay nhỏ hơn rồi mới nhập giá trị",
   "nút cộng để thêm một điều kiện nữa vào lần tìm trong Finder",
   "dòng ghi tất cả các điều kiện sau đều đúng, bên dưới có các hàng thụt vào",
   "nút trừ ở cuối một hàng điều kiện tìm kiếm"
  ],
  "anatomy": [
   {
    "n": "Compound row (All / Any of the following)",
    "sym": "NSRuleEditor.RowType.compound",
    "d": "\"Tất cả các điều kiện sau đều đúng\" là một compound row: pop-up của nó chuyển các hàng bên dưới giữa ba chế độ All, Any và None."
   },
   {
    "n": "Add and remove buttons (− +)",
    "sym": "NSRuleEditor.addRow(_:)",
    "d": "\"Nút cộng\" cùng nút trừ bên cạnh nằm ở đầu phải của mọi hàng: + thêm một hàng ngay dưới hàng này, còn − xoá chính hàng này (NSRuleEditor.removeRow(at:))."
   },
   {
    "n": "Criteria row (condition)",
    "sym": "NSPredicateEditorRowTemplate",
    "d": "\"Nhiều tiêu chí tìm kiếm trong các menu thả xuống\" chính là các criteria row: mỗi hàng gồm pop-up bên trái chọn thứ cần kiểm tra, một pop-up toán tử như \"contains\", rồi đến giá trị."
   },
   {
    "n": "Nested rows (indented group)",
    "sym": "NSRuleEditor.NestingMode.compound",
    "d": "\"Những hàng bị đẩy vào dưới dòng Any of the following\" là một nhóm lồng nhau (nested group): các điều kiện thuộc về compound row ngay phía trên, được dịch sang phải một bậc."
   }
  ],
  "prompt": "Hãy thêm một rule editor, tức NSPredicateEditor (lớp con của NSRuleEditor; SwiftUI không có sẵn nên bọc nó trong NSViewRepresentable). Mỗi điều kiện là một hàng gồm pop-up bên trái, pop-up toán tử và ô nhập giá trị; ở đầu phải của mọi hàng có nút − để xoá hàng và nút + để thêm một hàng ngay bên dưới. Mô tả các hàng bằng NSPredicateEditorRowTemplate và đọc kết quả từ objectValue. Tuyệt đối không tự ghép các hàng bằng những pop-up button rời rạc.",
  "debug": "Hãy giúp tôi gỡ lỗi rule editor của mình (NSPredicateEditor, NSRuleEditor, NSPredicateEditorRowTemplate). Loại trừ lần lượt các khả năng sau: predicate không khớp với row template nào nên hàng để trống và console in \"unable to find template matching predicate\"; không có row template kiểu compound trong khi predicate dùng AND hoặc OR; key path trùng với từ khoá của predicate (như size) khiến NSPredicate(format:) viết hoa nó lên nên chẳng khớp gì; nestingMode đặt là .single làm ẩn các nút − và +; canRemoveAllRows là false nên nút − của hàng cuối cứ bị mờ; rowHeight quá nhỏ so với các pop-up; toán tử hoặc kiểu giá trị không hợp với thuộc tính; dùng NSRuleEditor thuần mà không gán delegate. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSPredicateEditor",
    "note": "từ macOS 10.5 trở lên; các hàng của nó sinh ra từ một NSPredicate"
   },
   {
    "lang": "AppKit",
    "text": "NSRuleEditor",
    "note": "lớp cơ sở; delegate sẽ cung cấp các hàng"
   },
   {
    "lang": "AppKit",
    "text": "NSPredicateEditorRowTemplate",
    "note": "mô tả một loại hàng cung cấp những gì: các pop-up và view nhập giá trị"
   },
   {
    "lang": "AppKit",
    "text": "NSRuleEditor.NestingMode.compound",
    "note": "chế độ mặc định; cho phép nhóm nằm trong nhóm"
   },
   {
    "lang": "SwiftUI",
    "text": "NSViewRepresentable",
    "note": "SwiftUI không có bản tương đương trực tiếp; hãy bọc NSPredicateEditor"
   },
   {
    "lang": "react-querybuilder",
    "text": "<QueryBuilder>",
    "note": "phiên bản trên web, gọi là query builder"
   }
  ],
  "see": [
   "macos/popup-pulldown-combo",
   "macos/sheet",
   "macos/search-field",
   "web/data-table"
  ]
 },
 "macos/save-panel": {
  "lead": "Bấm vào mũi tên nhỏ cạnh ô tên, đó là disclosure button",
  "sym": [
   "NSSavePanel",
   "View.fileExporter(isPresented:document:contentType:defaultFilename:onCompletion:)"
  ],
  "aka": [
   "save dialog",
   "save-as panel",
   "file save picker",
   "NSSavePanel"
  ],
  "def": "Save panel là hộp thoại của hệ thống để chọn tên tệp, vị trí lưu và đôi khi cả định dạng tệp. Dạng thu gọn của nó có thể mở rộng thành một trình duyệt tệp giống Finder, có sidebar và phần liệt kê nội dung thư mục. NSSavePanel mang lại hành vi native, việc kiểm tra hợp lệ, tích hợp sandbox và cách hiển thị dưới dạng sheet.",
  "phrases": [
   "cửa sổ Lưu thành trên Mac",
   "hộp thoại đặt tên cho tệp trước khi lưu",
   "cái mũi tên nhỏ làm hộp thoại lưu bung rộng ra",
   "ô chọn định dạng tệp trong Lưu thành",
   "thanh bên kiểu Finder nằm trong cửa sổ lưu"
  ],
  "anatomy": [
   {
    "n": "Name field",
    "sym": "NSSavePanel.nameFieldStringValue",
    "d": "Ô nhập chữ Save As mà bạn gõ được chính là name field của panel."
   },
   {
    "n": "Disclosure expansion button",
    "sym": "NSSavePanel.isExpanded",
    "d": "\"Cái mũi tên nhỏ làm cửa sổ lưu to ra\" là disclosure button, dùng để mở phần trình duyệt tệp mở rộng của panel."
   },
   {
    "n": "Format pop-up",
    "sym": "NSSavePanel.allowedContentTypes",
    "d": "Bộ chọn loại tệp nằm dưới ô tên là format pop-up, danh sách của nó bị giới hạn bởi các allowed content types của panel."
   }
  ],
  "prompt": "Hãy hiển thị Save Panel chuẩn bằng NSSavePanel (với luồng SwiftUI thì dùng View.fileExporter), gồm đủ ô tên có thể sửa, disclosure button mở trình duyệt tệp mở rộng, pop-up chọn định dạng theo allowed content types, và sidebar kiểu Finder. Không dựng lại hộp thoại lưu của hệ thống từ các control tự chế.",
  "debug": "Hãy giúp tôi gỡ lỗi save panel trên macOS (NSSavePanel, NSOpenPanel). Loại trừ lần lượt các khả năng sau: URL trong sandbox về sau bị lỗi vì chưa từng gọi startAccessingSecurityScopedResource hoặc chưa lưu bookmark; allowedContentTypes lọc sạch mọi thứ nên nút Save bị vô hiệu; runModal chặn cả ứng dụng trong khi ý định là dùng beginSheetModal; panel mở sai thư mục vì directoryURL được gán sau khi đã hiển thị. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSSavePanel"
   },
   {
    "lang": "SwiftUI",
    "text": "View.fileExporter(isPresented:document:contentType:defaultFilename:onCompletion:)"
   },
   {
    "lang": "AppKit",
    "text": "NSSavePanel.beginSheetModal(for:completionHandler:)"
   }
  ],
  "see": [
   "macos/sheet",
   "macos/sidebar",
   "macos/disclosure-triangle",
   "macos/popup-pulldown-combo"
  ]
 },
 "macos/scroll-view": {
  "lead": "Hãy cuộn khung này; trên macOS cả thứ đó gọi là scroller chứ không phải scrollbar",
  "sym": [
   "NSScrollView",
   "NSScroller"
  ],
  "aka": [
   "scrolling view",
   "scroll container",
   "scrollbar",
   "NSScroller"
  ],
  "def": "Scroll view là một khung nhìn (viewport) mở ra trên phần nội dung lớn hơn vùng đang hiển thị. AppKit gọi thanh nằm ở mép của nó là scroller: phần kéo được là knob, còn rãnh phía sau là knob slot. Các scroller overlay hiện đại nổi lên trên nội dung rồi mờ dần đi, còn scroller legacy thì chiếm hẳn một phần bố cục cố định.",
  "phrases": [
   "vùng mà bạn cuộn được bên trong",
   "thanh cuộn ở cạnh cửa sổ Mac",
   "cục nhỏ bạn kéo để cuộn",
   "cái rãnh nằm sau cục kéo của thanh cuộn",
   "thanh cuộn tự mờ đi cho đến khi bạn cuộn",
   "hiệu ứng nảy như dây chun ở cuối danh sách"
  ],
  "anatomy": [
   {
    "n": "Scroller",
    "sym": "NSScroller",
    "d": "Thứ mà đa số mọi người gọi là thanh cuộn (scrollbar) thì tên chính thức trong AppKit là scroller."
   },
   {
    "n": "Scroller knob (thumb)",
    "sym": "NSScroller.knobProportion",
    "d": "\"Cục nhỏ mà bạn kéo\" là scroller knob; độ dài của nó phản ánh lượng nội dung đang nhìn thấy."
   },
   {
    "n": "Knob slot (track)",
    "sym": "NSScroller.drawKnobSlot(in:highlight:)",
    "d": "Rãnh nằm sau knob là knob slot, thường được gọi là track của thanh cuộn."
   },
   {
    "n": "Overlay vs. legacy scroller",
    "sym": "NSScroller.Style",
    "d": "Scroller overlay phủ lên nội dung rồi mờ đi; scroller legacy luôn hiện và chiếm chỗ trong bố cục."
   }
  ],
  "prompt": "Hãy dùng Scroll View native (NSScrollView; trong SwiftUI là ScrollView). Với AppKit, gọi control ở mép là NSScroller, có knob kéo được nằm trong knob slot; tôn trọng sự khác nhau giữa overlay và legacy của NSScroller.Style, và giữ nguyên độ đàn hồi cuộn native ở hai đầu nội dung.",
  "debug": "Hãy giúp tôi gỡ lỗi scroll view trên macOS (NSScrollView, NSClipView). Loại trừ lần lượt các khả năng sau: gốc toạ độ của nội dung bị nhầm vì document view không được flipped; kiểu scroller overlay so với legacy làm bề rộng khả dụng khác nhau giữa các người dùng; hiệu ứng rubber-band khi cuộn quá đầu bị tắt hoặc bị nhân đôi do các thiết lập elasticity; sự kiện con lăn bị một scroll view lồng bên trong nuốt mất; scrollToVisible tranh chấp với cơ chế prefetch của responsive scrolling. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSScrollView"
   },
   {
    "lang": "AppKit",
    "text": "NSScroller"
   },
   {
    "lang": "SwiftUI",
    "text": "ScrollView"
   },
   {
    "lang": "AppKit",
    "text": "NSClipView"
   }
  ],
  "see": [
   "macos/sidebar",
   "macos/outline-view",
   "macos/column-view"
  ]
 },
 "macos/search-field": {
  "lead": "Gõ chữ vào thì nút cancel hiện ra; bấm kính lúp để mở menu tìm kiếm gần đây",
  "sym": [
   "NSSearchField",
   "View.searchable(text:placement:prompt:)"
  ],
  "aka": [
   "search box",
   "search bar",
   "NSSearchField",
   "searchable field"
  ],
  "def": "Search field là ô nhập văn bản chuyên dùng để lọc hoặc tìm nội dung. Trên macOS, nó thường có nút kính lúp để tìm, một nút cancel chỉ hiện khi câu truy vấn không rỗng, và tuỳ chọn thêm một menu các lần tìm gần đây. Modifier searchable của SwiftUI sẽ đặt ô tìm kiếm của nền tảng vào một vị trí phù hợp, chẳng hạn trên toolbar.",
  "phrases": [
   "ô bo tròn có hình kính lúp",
   "ô nhập tìm kiếm nằm trên toolbar của Mac",
   "dấu x nhỏ để xoá nội dung đang tìm",
   "nút kính lúp nằm trong ô nhập chữ",
   "danh sách thả xuống các lần tìm gần đây"
  ],
  "anatomy": [
   {
    "n": "Search button",
    "sym": "NSSearchFieldCell.searchButtonCell",
    "d": "Kính lúp ở đầu trái ô là search button thật sự, chứ không chỉ là biểu tượng trang trí của placeholder."
   },
   {
    "n": "Cancel button",
    "sym": "NSSearchFieldCell.cancelButtonCell",
    "d": "\"Dấu x nhỏ xoá nội dung tìm\" là cancel button của ô."
   },
   {
    "n": "Recent-searches menu",
    "sym": "NSSearchFieldCell.searchMenuTemplate",
    "d": "Menu gắn với biểu tượng tìm kiếm có thể liệt kê các truy vấn gần đây cùng lệnh Clear Recents."
   }
  ],
  "prompt": "Hãy dùng Search Field native với NSSearchField (SwiftUI: View.searchable). Giữ nguyên nút tìm ở đầu trái, nút cancel ở cuối phải khi ô đang có chữ, và menu tìm kiếm gần đây tuỳ chọn lấy từ NSSearchFieldCell.searchMenuTemplate.",
  "debug": "Hãy giúp tôi gỡ lỗi ô tìm kiếm trên macOS (NSSearchField). Loại trừ lần lượt các khả năng sau: việc tìm chỉ chạy khi nhấn Return vì sendsSearchStringImmediately là false; nút xoá làm sạch chữ nhưng code của tôi không hề được báo, nên cần để ý action với chuỗi rỗng; menu gần đây không hoạt động vì thiếu recentsAutosaveName; nút cancel bị ẩn ở các control size nhỏ. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSSearchField"
   },
   {
    "lang": "SwiftUI",
    "text": "View.searchable(text:placement:prompt:)"
   },
   {
    "lang": "AppKit",
    "text": "NSSearchFieldCell"
   }
  ],
  "see": [
   "macos/toolbar",
   "macos/combo-button",
   "macos/popup-pulldown-combo",
   "macos/rule-editor"
  ]
 },
 "macos/segmented-control": {
  "lead": "Một control liền khối, một segment được chọn: đó là segmented control",
  "sym": [
   "NSSegmentedControl",
   "PickerStyle.segmented"
  ],
  "aka": [
   "segment control",
   "segmented picker",
   "button group"
  ],
  "def": "Segmented control gom một tập nhỏ các lựa chọn liên quan thành một hàng ngang gồm những nút nối liền nhau. Segment đang được chọn mang giao diện bị nhấn hoặc được tô đầy, nên chế độ hiện tại nhìn là thấy ngay. NSSegmentedControl cũng có thể cấu hình để chọn nhiều hoặc theo kiểu momentary (nhấn là nhả), nhưng một Picker dạng segmented thông thường chỉ biểu diễn một lựa chọn được giữ lại.",
  "phrases": [
   "hàng nút nối liền nhau, trong đó có một nút luôn được chọn",
   "viên thuốc chia thành nhiều ô bấm được",
   "những tab nhỏ để chuyển giữa các chế độ xem",
   "nhóm nút biểu tượng ghép liền trên toolbar",
   "bộ chọn nằm ngang có một phần đang bị nhấn xuống"
  ],
  "anatomy": [
   {
    "n": "Selected segment",
    "sym": "NSSegmentedControl.selectedSegment",
    "d": "\"Phần cứ bị nhấn xuống\" chính là selected segment."
   },
   {
    "n": "Segment divider",
    "sym": "NSSegmentedControl",
    "d": "\"Đường kẻ nhỏ ngăn hai lựa chọn trong viên thuốc\" là segment divider."
   }
  ],
  "prompt": "Hãy dùng Segmented Control với NSSegmentedControl (SwiftUI: Picker với PickerStyle.segmented), thể hiện segment đang hoạt động bằng kiểu hiển thị được chọn của hệ thống. Giữ các nút liền nhau như một control duy nhất và ràng buộc (bind) phần chọn sao cho luôn có đúng một segment được chọn, phục vụ bộ chuyển view này.",
  "debug": "Hãy giúp tôi gỡ lỗi segmented control trên macOS (NSSegmentedControl). Loại trừ lần lượt các khả năng sau: trackingMode sai, vì momentary thì segment kích hoạt rồi bỏ chọn còn selectOne mới giữ lựa chọn; selectedSegment bằng -1 trong action ở chế độ momentary; ảnh của segment không phải template nên dark mode bị hỏng; bề rộng segment tự động nhảy khi nhãn thay đổi. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSSegmentedControl"
   },
   {
    "lang": "SwiftUI",
    "text": "PickerStyle.segmented"
   },
   {
    "lang": "AppKit",
    "text": "NSSegmentedControl.trackingMode",
    "note": "kiểu chọn: một, nhiều hoặc momentary"
   },
   {
    "lang": "SwiftUI",
    "text": "View.pickerStyle(_:)"
   }
  ],
  "see": [
   "macos/toolbar",
   "web/tabs",
   "web/toggle-group",
   "macos/focus-ring"
  ]
 },
 "macos/sheet": {
  "lead": "Tấm panel trượt xuống từ thanh tiêu đề là sheet, chỉ chặn đúng cửa sổ của nó",
  "sym": [
   "NSWindow.beginSheet(_:completionHandler:)",
   "NSWindow.endSheet(_:returnCode:)"
  ],
  "aka": [
   "window-modal dialog",
   "document-modal dialog",
   "attached sheet"
  ],
  "def": "Sheet là một panel modal gắn vào một cửa sổ cụ thể, theo truyền thống thả xuống từ thanh tiêu đề của cửa sổ đó. Nó ngăn mọi tương tác với cửa sổ cha, trong khi các cửa sổ khác của ứng dụng vẫn dùng được bình thường. Ngược lại, hộp thoại app-modal chặn cả ứng dụng và không gắn trực quan vào một cửa sổ tài liệu nào.",
  "phrases": [
   "hộp thoại trượt xuống từ thanh tiêu đề cửa sổ",
   "modal chỉ gắn với đúng một cửa sổ Mac",
   "panel treo lủng lẳng ở đỉnh cửa sổ tài liệu",
   "hộp thoại lưu dính vào cửa sổ cha của nó",
   "popup chặn một cửa sổ nhưng không chặn cả ứng dụng"
  ],
  "anatomy": [
   {
    "n": "Dimming layer",
    "sym": "View.sheet(isPresented:content:)",
    "d": "\"Vùng tối đi phía sau sheet\" là dimming layer, báo hiệu bề mặt cha tạm thời không dùng được."
   }
  ],
  "prompt": "Hãy hiển thị phần này dưới dạng Sheet window-modal bằng NSWindow.beginSheet(_:completionHandler:) (SwiftUI: View.sheet), gắn trực quan ngay dưới thanh tiêu đề của cửa sổ cha. Chỉ chặn cửa sổ cha đó, không chặn mọi cửa sổ của ứng dụng.",
  "debug": "Hãy giúp tôi gỡ lỗi sheet trên macOS (NSWindow.beginSheet(_:completionHandler:), SwiftUI View.sheet). Loại trừ lần lượt các khả năng sau: binding isPresented/item không bao giờ được reset nên không hiện lần thứ hai; endSheet chưa từng được gọi nên cửa sổ cha vẫn bị chặn; trình bày từ một view controller không gắn với cửa sổ nên chẳng có gì hiện ra; hai sheet xếp hàng trên cùng một cửa sổ lại hiện nối tiếp nhau ngoài ý muốn. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSWindow.beginSheet(_:completionHandler:)"
   },
   {
    "lang": "AppKit",
    "text": "NSWindow.endSheet(_:returnCode:)"
   },
   {
    "lang": "SwiftUI",
    "text": "View.sheet(isPresented:onDismiss:content:)"
   },
   {
    "lang": "AppKit",
    "text": "NSApplication.runModal(for:)",
    "note": "phương án app-modal, không phải sheet"
   }
  ],
  "see": [
   "macos/alert",
   "macos/panel",
   "web/scrim",
   "web/dialog-drawer-sheet",
   "macos/focus-ring",
   "macos/rule-editor"
  ]
 },
 "macos/sidebar": {
  "lead": "Cột trong mờ bên trái là sidebar; nút hình chữ nhật chia đôi dùng để bật tắt nó",
  "sym": [
   "NavigationSplitView",
   "NSSplitViewController"
  ],
  "aka": [
   "source list",
   "navigation sidebar",
   "split view sidebar"
  ],
  "def": "Sidebar là cột điều hướng ngoài cùng bên trái, các ứng dụng như Finder và Mail dùng nó để sắp các điểm đến thành từng nhóm. AppKit gọi dạng danh sách của nó là source list, còn SwiftUI hiện đại thường dựng cấu trúc bằng NavigationSplitView cùng kiểu danh sách sidebar. Nó có thể thu lại độc lập với phần nội dung chính và hay dùng chất liệu trong mờ phía sau các hàng.",
  "phrases": [
   "danh sách trong mờ chạy dọc bên trái ứng dụng Mac",
   "cột điều hướng kiểu Finder",
   "panel trái có các nhóm và hàng được chọn",
   "thanh bên thu gọn được cạnh phần nội dung chính",
   "danh sách thư mục hoặc trang ở bên trái",
   "dải điều hướng của Mac có nền kính mờ"
  ],
  "anatomy": [
   {
    "n": "Source-list style",
    "sym": "NSTableView.Style.sourceList",
    "d": "Cách trình bày các hàng thoáng đãng, hợp với vibrancy, giống Finder, chính là source-list style của AppKit."
   },
   {
    "n": "Section header",
    "sym": "NSOutlineViewDelegate.outlineView(_:isGroupItem:)",
    "d": "Nhãn nhỏ được nhấn mạnh, chia các điểm đến thành nhóm như Favorites hay iCloud, là section header."
   },
   {
    "n": "Selection pill",
    "sym": "NSTableRowView.isSelected",
    "d": "\"Nền màu bo tròn phía sau hàng hiện tại\" là selection pill của sidebar."
   },
   {
    "n": "Sidebar toggle toolbar button",
    "sym": "NSSplitViewController.toggleSidebar(_:)",
    "d": "Biểu tượng chuẩn hình chữ nhật chia đôi trên toolbar, dùng để hiện hoặc ẩn cột đầu, là sidebar toggle."
   }
  ],
  "prompt": "Hãy dựng một Sidebar (Source List) cho macOS bằng NavigationSplitView (AppKit: NSSplitViewController), dùng giao diện sidebar trong mờ native và cách chọn hàng của source list. Nó phải nằm ở cột trái, hỗ trợ thu gọn, và tách điều hướng khỏi phần nội dung chi tiết.",
  "debug": "Hãy giúp tôi gỡ lỗi sidebar trên macOS (sidebar item của NSSplitViewController, SwiftUI NavigationSplitView). Loại trừ lần lượt các khả năng sau: hiệu ứng vibrancy kính mờ biến mất vì nội dung sidebar không nằm trong effect view dùng chất liệu sidebar; toggleSidebar nối nhầm tới split view item khác; bề rộng không được nhớ do thiếu autosaveName; vùng highlight chọn mất kiểu bo tròn thụt vào khi kiểu danh sách thay đổi. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "SwiftUI",
    "text": "NavigationSplitView"
   },
   {
    "lang": "AppKit",
    "text": "NSSplitViewController"
   },
   {
    "lang": "AppKit",
    "text": "NSSplitViewItem(sidebarWithViewController:)"
   },
   {
    "lang": "AppKit",
    "text": "NSTableView.Style.sourceList",
    "note": "giao diện danh sách chuẩn của AppKit"
   },
   {
    "lang": "SwiftUI",
    "text": "ListStyle.sidebar"
   }
  ],
  "see": [
   "macos/inspector",
   "macos/toolbar",
   "macos/vibrancy",
   "macos/disclosure-triangle"
  ]
 },
 "macos/slider": {
  "lead": "Hãy kéo các núm; slider phía dưới bám vào các vạch chia (allowsTickMarkValuesOnly)",
  "sym": [
   "NSSlider",
   "Slider(value:in:step:)"
  ],
  "aka": [
   "slider control",
   "seek bar",
   "track bar",
   "range control"
  ],
  "def": "\"Chấm tròn bạn kéo dọc theo một đường kẻ\" là slider, trong AppKit là NSSlider. Hình tròn là knob, rãnh là track, và đoạn từ đầu rãnh đến knob được tô bằng màu accent. Slider liên tục (continuous) chọn được mọi giá trị trong khoảng; nếu thêm tick marks (các vạch nhỏ bên dưới) cùng allowsTickMarkValuesOnly, knob sẽ chỉ dừng ở các điểm cố định, và slider Key Repeat trong System Settings là ví dụ kinh điển có vạch chia.",
  "phrases": [
   "chấm tròn kéo trái phải để đổi một giá trị",
   "control kiểu âm lượng, có núm tròn trên một đường kẻ",
   "thanh có cái vòng tròn để trượt",
   "những vạch nhỏ dưới slider mà núm bám vào",
   "phần xanh được tô đầy của đường slider",
   "thứ để kéo chọn một con số giữa giá trị nhỏ nhất và lớn nhất"
  ],
  "anatomy": [
   {
    "n": "Knob (thumb)",
    "sym": "NSSlider.knobThickness",
    "d": "\"Chấm tròn bạn kéo\" là knob; AppKit gọi nó là knob, còn trên web cùng thứ đó gọi là thumb."
   },
   {
    "n": "Filled track",
    "sym": "Slider + .tint",
    "d": "\"Đoạn màu xanh của đường kẻ trước knob\" là phần được tô đầy của track, cho thấy giá trị đang nằm ở đâu trong khoảng."
   },
   {
    "n": "Track",
    "sym": "NSSlider.SliderType.linear",
    "d": "\"Cái rãnh để chấm tròn trượt dọc\" là track, tức toàn bộ khoảng giá trị từ đầu đến cuối."
   },
   {
    "n": "Tick marks",
    "sym": "NSSlider.numberOfTickMarks",
    "d": "\"Những vạch nhỏ dưới slider\" là tick marks; khi có allowsTickMarkValuesOnly, knob chỉ đáp xuống đúng các vạch đó."
   }
  ],
  "prompt": "Hãy dùng slider native của macOS, là NSSlider (SwiftUI: Slider(value:in:step:)): kiểu linear nằm ngang, knob tròn, phần đầu của track được tô bằng màu accent. Với giá trị rời rạc, thêm tick marks bên dưới bằng numberOfTickMarks và tickMarkPosition = .below, rồi cho knob bám vào chúng bằng allowsTickMarkValuesOnly = true. Đặt isContinuous = true để giá trị cập nhật ngay trong lúc kéo.",
  "debug": "Hãy giúp tôi gỡ lỗi slider trên macOS (NSSlider, SwiftUI Slider). Loại trừ lần lượt các khả năng sau: action bắn dồn dập ở từng pixel vì isContinuous đang bật (hoặc thiếu trong khi cần cập nhật trực tiếp); allowsTickMarkValuesOnly làm giá trị bị bám vào chỗ không ngờ tới; binding giá trị ghi ngược lại giữa lúc kéo và tranh chấp với cử chỉ; hướng dọc bị AppKit suy ra từ hình dạng frame thay vì được đặt tường minh. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSSlider"
   },
   {
    "lang": "SwiftUI",
    "text": "Slider(value:in:step:)"
   },
   {
    "lang": "AppKit",
    "text": "NSSlider.numberOfTickMarks"
   },
   {
    "lang": "AppKit",
    "text": "NSSlider.allowsTickMarkValuesOnly",
    "note": "bám vào các vạch chia"
   },
   {
    "lang": "AppKit",
    "text": "NSSlider.tickMarkPosition",
    "note": "đặt .below hoặc .above"
   },
   {
    "lang": "AppKit",
    "text": "NSSlider.isContinuous",
    "note": "phản hồi ngay khi đang kéo, không chỉ lúc thả tay"
   }
  ],
  "see": [
   "macos/stepper",
   "macos/level-indicator",
   "macos/segmented-control"
  ]
 },
 "macos/split-view": {
  "lead": "Hãy kéo đường chia; đường kẻ trên toolbar phía trên nó là tracking separator",
  "sym": [
   "NSSplitView",
   "NSSplitViewItem"
  ],
  "aka": [
   "split pane",
   "splitter view",
   "multi-pane layout",
   "navigation split view"
  ],
  "def": "Split view chia một vùng của cửa sổ thành hai hay nhiều pane có thể đổi kích thước độc lập với nhau. Đường nằm giữa các pane được gọi là split-view divider hay splitter khi kéo được, chứ không chỉ là đường ngăn trang trí. Sidebar là một loại pane chuyên biệt và có thể thu lại trong lúc pane còn lại giãn ra.",
  "phrases": [
   "cửa sổ được chia thành hai khung đổi cỡ được",
   "đường kẻ giữa hai khung mà tôi kéo",
   "đường chia dùng để đổi bề rộng sidebar",
   "khung trái co gọn vào mép cửa sổ",
   "đường kẻ trên toolbar chạy theo đường chia của sidebar"
  ],
  "anatomy": [
   {
    "n": "Pane (split-view item)",
    "sym": "NSSplitViewItem",
    "d": "Mỗi vùng có kích thước riêng ở hai bên đường chia là một pane, được đại diện bởi một NSSplitViewItem."
   },
   {
    "n": "Split-view divider (splitter)",
    "sym": "NSSplitView.dividerThickness",
    "d": "\"Đường kẻ giữa hai khung mà tôi kéo\" là split-view divider, còn gọi là splitter."
   },
   {
    "n": "Sidebar collapse behavior",
    "sym": "NSSplitViewItem.collapseBehavior",
    "d": "Cách sidebar gập lại và nhường bề rộng cho pane kế bên chính là collapse behavior của nó."
   },
   {
    "n": "Tracking separator toolbar item",
    "sym": "NSTrackingSeparatorToolbarItem",
    "d": "Đường chia trên toolbar luôn nằm đúng phía trên một split-view divider đang di chuyển là tracking separator."
   }
  ],
  "prompt": "Hãy dựng Split View native với NSSplitView và NSSplitViewItem (SwiftUI: NavigationSplitView), có đường chia kéo được giữa các pane kích thước độc lập. Cho item sidebar hành vi thu gọn native, và căn mọi ranh giới trên toolbar bằng NSTrackingSeparatorToolbarItem.",
  "debug": "Hãy giúp tôi gỡ lỗi split view trên macOS (NSSplitView, NSSplitViewController). Loại trừ lần lượt các khả năng sau: vị trí đường chia không được nhớ vì thiếu autosaveName; holding priority quyết định pane nào gánh phần co giãn khi đổi cỡ cửa sổ, tức pane có priority thấp nhất sẽ to ra; ràng buộc min/max của delegate đánh nhau với constraint Auto Layout trên cùng các pane; canCollapse khiến một pane bị đóng sập bất ngờ khi nhấp đúp. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSSplitView"
   },
   {
    "lang": "AppKit",
    "text": "NSSplitViewItem"
   },
   {
    "lang": "SwiftUI",
    "text": "NavigationSplitView"
   },
   {
    "lang": "AppKit",
    "text": "NSSplitViewController"
   }
  ],
  "see": [
   "macos/sidebar",
   "macos/inspector",
   "macos/toolbar",
   "macos/window"
  ]
 },
 "macos/stepper": {
  "lead": "Cặp mũi tên bé xíu là stepper; bấm một lần hoặc giữ chuột để lặp tự động",
  "sym": [
   "NSStepper",
   "Stepper"
  ],
  "aka": [
   "stepper control",
   "stepper arrows",
   "numeric stepper",
   "incrementer"
  ],
  "def": "Stepper là cặp nút mũi tên nhỏ xếp chồng, dùng để đổi một giá trị theo bước cố định. Nó thường đặt cạnh ô nhập số, để người dùng có thể gõ đúng giá trị hoặc chỉnh từng bước một. Trạng thái bật tắt của các nút nên phản ánh giá trị tối thiểu và tối đa đã cấu hình, và giữ chuột trên một mũi tên có thể lặp lại việc thay đổi.",
  "phrases": [
   "cặp mũi tên lên xuống bé xíu cạnh ô nhập số",
   "control nhỏ để tăng hoặc giảm một giá trị",
   "các nút mũi tên xếp chồng cạnh ô nhập số",
   "control nhỏ kiểu cộng trừ để đổi một con số",
   "mũi tên xoay (spinner) để chỉnh giá trị từng bước một"
  ],
  "anatomy": [
   {
    "n": "Increment button",
    "sym": "NSStepper.increment",
    "d": "\"Mũi tên nhỏ phía trên làm con số tăng\" là increment button."
   },
   {
    "n": "Decrement button",
    "sym": "NSStepper.increment",
    "d": "\"Mũi tên nhỏ phía dưới làm con số giảm\" là decrement button."
   }
  ],
  "prompt": "Hãy đặt một Stepper native dùng NSStepper (SwiftUI: Stepper) cạnh ô nhập số, với cặp mũi tên lên/xuống gọn gàng được căn dọc theo ô đó. Ràng buộc cả hai control vào cùng một giá trị và áp đúng bước tăng, giá trị nhỏ nhất, giá trị lớn nhất theo ý định.",
  "debug": "Hãy giúp tôi gỡ lỗi stepper trên macOS (NSStepper, SwiftUI Stepper). Loại trừ lần lượt các khả năng sau: stepper và ô nhập chữ của nó không bind cùng một giá trị nên lệch nhau; valueWraps làm giá trị quay vòng từ max về min; autorepeat bắn liên tục khi đang giữ trong khi chỉ cần từng bước đơn; number formatter kẹp hoặc từ chối giá trị mà stepper vừa đặt. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSStepper"
   },
   {
    "lang": "SwiftUI",
    "text": "Stepper"
   },
   {
    "lang": "AppKit",
    "text": "NSStepper.increment"
   },
   {
    "lang": "AppKit",
    "text": "NSStepper.minValue"
   },
   {
    "lang": "AppKit",
    "text": "NSStepper.maxValue"
   }
  ],
  "see": [
   "macos/slider",
   "macos/focus-ring",
   "macos/segmented-control",
   "macos/popup-pulldown-combo",
   "web/steps",
   "web/time-pickers"
  ]
 },
 "macos/token-field": {
  "lead": "Các viên thuốc xoá được trong ô là token; gõ một cái rồi nhấn ⏎",
  "sym": [
   "NSTokenField",
   "NSTokenField.TokenStyle"
  ],
  "aka": [
   "token input",
   "recipient field",
   "tag input",
   "pill input"
  ],
  "def": "Token field biến những đoạn chữ gõ vào mà nó nhận ra được thành các token bo tròn riêng biệt, giống người nhận trong cửa sổ soạn thư. Mỗi token đại diện cho một giá trị, và có thể được chọn, sửa hoặc xoá mà không coi cả ô là văn bản thuần. AppKit cung cấp, thông qua NSTokenField, kiểu dáng token, gợi ý hoàn thành, các represented object và ký tự phân tách để tách token.",
  "phrases": [
   "ô nhập chữ bên trong có các viên thuốc xoá được",
   "những bong bóng địa chỉ email ở ô To",
   "ô nhập biến các từ thành những thẻ nhỏ",
   "các chip bo tròn mà bạn xoá được khỏi ô",
   "ô mà mỗi người nhận thành một bong bóng riêng"
  ],
  "anatomy": [
   {
    "n": "Token capsule",
    "sym": "NSTokenField.TokenStyle",
    "d": "\"Bong bóng bo tròn nhỏ bao quanh mỗi người nhận\" là token capsule."
   },
   {
    "n": "Selected token",
    "sym": "NSTokenField",
    "d": "\"Cả viên thuốc sáng lên trước khi tôi xoá\" là selected token."
   }
  ],
  "prompt": "Hãy dùng Token Field native (NSTokenField) với NSTokenField.TokenStyle, để mỗi người nhận hoặc thẻ được nhận ra trở thành một token bo tròn có thể chọn và xoá riêng lẻ bên trong ô nhập. Giữ nguyên tính năng hoàn thành token và hành vi xoá bằng bàn phím.",
  "debug": "Hãy giúp tôi gỡ lỗi token field trên macOS (NSTokenField). Loại trừ lần lượt các khả năng sau: chữ không thành token cho đến khi nhấn Return vì tập ký tự tokenizing thiếu dấu phân tách của bạn; nhầm represented object với chuỗi hiển thị trong delegate nên token lộ ra mã định danh thô; gợi ý hoàn thành không bao giờ hiện vì chưa cài phương thức completion của delegate; copy ra văn bản thuần vì chưa cài việc ghi các represented object vào pasteboard. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSTokenField"
   },
   {
    "lang": "AppKit",
    "text": "NSTokenField.TokenStyle"
   },
   {
    "lang": "AppKit",
    "text": "NSTokenFieldDelegate"
   }
  ],
  "see": [
   "macos/search-field",
   "macos/popup-pulldown-combo",
   "web/badge-chip-pill",
   "web/multi-select"
  ]
 },
 "macos/toolbar": {
  "lead": "Tiêu đề và các toolbar item dùng chung một dải: unified title bar (NSToolbar)",
  "sym": [
   "NSToolbar",
   "NSToolbarItem"
  ],
  "aka": [
   "window toolbar",
   "unified toolbar",
   "title bar toolbar"
  ],
  "def": "Toolbar chứa các hành động chính của một cửa sổ, và ở kiểu unified nó có thể dùng chung một hàng trên cùng với tiêu đề cửa sổ. Các toolbar item native của nó tham gia vào cách macOS chia khoảng cách, kiểm tra hợp lệ, tuỳ biến và xử lý tràn. Tuỳ theo kiểu cửa sổ và vị trí cuộn, giữa phần chrome này và nội dung cửa sổ có thể xuất hiện một title bar separator.",
  "phrases": [
   "hàng nút chạy ngang đỉnh cửa sổ Mac",
   "thanh tiêu đề có ô tìm kiếm và các biểu tượng hành động",
   "phần đầu cửa sổ Mac nơi toolbar và tiêu đề chung một hàng",
   "dải trên cùng với các hành động cửa sổ tuỳ chỉnh được",
   "đường kẻ ngăn toolbar với nội dung cửa sổ"
  ],
  "anatomy": [
   {
    "n": "Toolbar item",
    "sym": "NSToolbarItem",
    "d": "Một nút, ô tìm kiếm, nhóm control hay khoảng trống co giãn trên toolbar đều là một toolbar item."
   },
   {
    "n": "Toolbar item label",
    "sym": "NSToolbarItem.label",
    "d": "Dòng chữ hiện dưới biểu tượng ở chế độ biểu tượng kèm chữ là item label; bảng tuỳ biến có thể dùng một palette label riêng."
   },
   {
    "n": "Overflow chevron",
    "sym": "NSToolbarItem.visibilityPriority",
    "d": "Mũi tên chevron ở cuối phải, hiện ra khi các item không còn chỗ, mở menu tràn (overflow menu) của toolbar."
   },
   {
    "n": "Title-bar separator styles",
    "sym": "NSWindow.titlebarSeparatorStyle",
    "d": "Ranh giới dưới toolbar có thể là tự động, một đường kẻ thấy rõ, một bóng đổ, hoặc không có, tuỳ theo title-bar separator style."
   }
  ],
  "prompt": "Hãy tạo một Toolbar (Unified Title Bar) bằng NSToolbar và NSWindow.ToolbarStyle.unified (SwiftUI: View.toolbar), dùng cách đặt và chia khoảng cách native của NSToolbarItem. Giữ tiêu đề nằm cùng hàng với các hành động và để NSWindow.titlebarSeparatorStyle điều khiển đường phân cách phía trên nội dung.",
  "debug": "Hãy giúp tôi gỡ lỗi toolbar trên macOS (NSToolbar, NSToolbarItem). Loại trừ lần lượt các khả năng sau: item biến mất vì không có trong itemIdentifiers, nhầm giữa danh sách defaults và alloweds; item bị xám do validateToolbarItem trả về false (hoặc chưa cài cho các view tự chế); tuỳ biến của người dùng không được nhớ khi thiếu autosavesConfiguration; kiểu unified title bar làm dịch bố cục nội dung xuống dưới toolbar. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSToolbar"
   },
   {
    "lang": "AppKit",
    "text": "NSToolbarItem"
   },
   {
    "lang": "AppKit",
    "text": "NSWindow.ToolbarStyle.unified",
    "note": "đặt tiêu đề cửa sổ cùng hàng với các toolbar item"
   },
   {
    "lang": "AppKit",
    "text": "NSWindow.titlebarSeparatorStyle"
   },
   {
    "lang": "SwiftUI",
    "text": "View.toolbar(content:)"
   }
  ],
  "see": [
   "macos/traffic-lights",
   "macos/sidebar",
   "macos/segmented-control",
   "macos/inspector"
  ]
 },
 "macos/traffic-lights": {
  "lead": "Rê chuột lên các nút; biểu tượng chỉ hiện ra khi hover",
  "sym": [
   "NSWindow.standardWindowButton(_:)",
   "NSWindow.ButtonType"
  ],
  "aka": [
   "window controls",
   "title bar buttons",
   "close minimize zoom buttons"
  ],
  "def": "Traffic lights là bộ ba nút điều khiển cửa sổ ở góc trên bên trái cửa sổ macOS: nút đỏ đóng, nút vàng thu nhỏ và nút xanh lá. Biểu tượng của chúng chỉ hiện ra khi con trỏ rê lên cả nhóm. Nút xanh lá thường đưa cửa sổ vào toàn màn hình và cũng mở ra các lựa chọn sắp xếp cửa sổ của hệ thống; về mặt mã, macOS vẫn nhận diện nó qua NSWindow.ButtonType.zoomButton.",
  "phrases": [
   "ba chấm màu ở góc cửa sổ Mac",
   "các nút đỏ vàng xanh ở trên cùng bên trái",
   "dấu x, dấu trừ và mũi tên nhỏ hiện lên khi rê chuột",
   "các nút đóng, thu nhỏ và toàn màn hình của cửa sổ Mac",
   "nút xanh lá làm cửa sổ to ra",
   "các nút đèn giao thông của macOS trên cửa sổ"
  ],
  "anatomy": [
   {
    "n": "Close button",
    "sym": "NSWindow.ButtonType.closeButton",
    "d": "Nút đỏ hiện dấu x khi hover cả nhóm và đóng cửa sổ, chứ không nhất thiết thoát ứng dụng."
   },
   {
    "n": "Minimize button",
    "sym": "NSWindow.ButtonType.miniaturizeButton",
    "d": "Nút vàng hiện dấu trừ khi hover và thu cửa sổ xuống Dock."
   },
   {
    "n": "Zoom / full-screen button",
    "sym": "NSWindow.ButtonType.zoomButton",
    "d": "Nút xanh lá thường đưa cửa sổ vào toàn màn hình; nhấp kèm Option thì gọi hành vi Zoom truyền thống của cửa sổ."
   },
   {
    "n": "Dirty-document dot",
    "sym": "NSWindow.isDocumentEdited",
    "d": "Chấm sẫm thay cho dấu x của nút đóng đánh dấu một tài liệu còn thay đổi chưa lưu."
   }
  ],
  "prompt": "Hãy dùng Traffic Lights chuẩn từ NSWindow.standardWindowButton(_:), giữ nguyên khoảng cách native, biểu tượng khi hover và các hành vi toàn màn hình cùng sắp xếp cửa sổ do hệ thống cấp cho nút xanh lá. Lấy nút xanh lá dưới dạng .zoomButton, và chỉ dùng NSWindow.toggleFullScreen(_:) khi cố ý gọi toàn màn hình; không thay bằng các hình tròn tự vẽ.",
  "debug": "Hãy giúp tôi gỡ lỗi traffic lights trên macOS (NSWindow.standardWindowButton). Loại trừ lần lượt các khả năng sau: các nút biến mất sau khi đổi styleMask hoặc dùng cửa sổ borderless; biểu tượng hover mất vì một titlebar accessory tự chế chặn việc theo dõi chuột; nút xanh lá phóng to cửa sổ trong khi bạn mong toàn màn hình (nhấp kèm Option mới là zoom); các nút đã dời vị trí bị trôi sau khi chuyển chế độ toàn màn hình do themed frame sắp xếp lại chúng. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSWindow.standardWindowButton(_:)"
   },
   {
    "lang": "AppKit",
    "text": "NSWindow.ButtonType",
    "note": "gồm closeButton, miniaturizeButton và zoomButton"
   },
   {
    "lang": "AppKit",
    "text": "NSWindow.toggleFullScreen(_:)",
    "note": "vào hoặc thoát cửa sổ toàn màn hình chiếm trọn một Space"
   }
  ],
  "see": [
   "macos/toolbar",
   "macos/focus-ring",
   "macos/panel"
  ]
 },
 "macos/vibrancy": {
  "lead": "Hiệu ứng kính mờ nhìn xuyên qua là vibrancy, một material của NSVisualEffectView",
  "sym": [
   "NSVisualEffectView",
   "NSVisualEffectView.Material"
  ],
  "aka": [
   "visual effect material",
   "frosted glass",
   "translucent material",
   "blur material"
  ],
  "def": "Visual effect material tạo ra nền trong mờ biết thích ứng mà bạn thấy phía sau sidebar, menu và panel của macOS. NSVisualEffectView chọn hiệu ứng nền này thông qua Material và BlendingMode của nó. Vibrancy là phần xử lý lớp trước đi kèm, làm tăng độ tương phản so với material đó; các control AppKit tiêu chuẩn tự bật nó ở những chỗ phù hợp.",
  "phrases": [
   "nền kính mờ phía sau sidebar của Mac",
   "panel mờ trong suốt cho màu bên dưới xuyên qua",
   "chất liệu nhìn xuyên qua phía sau menu và HUD",
   "hiệu ứng làm mờ của Mac thay đổi theo hình nền",
   "nền như kính ở phía sau các nút điều khiển cửa sổ"
  ],
  "anatomy": [
   {
    "n": "Material layer",
    "sym": "NSVisualEffectView.Material",
    "d": "\"Nền kính mờ phía sau panel\" là material layer."
   },
   {
    "n": "Vibrant foreground",
    "sym": "NSVisualEffectView.allowsVibrancy",
    "d": "\"Chữ và biểu tượng thích ứng trên nền kính\" là vibrant foreground."
   }
  ],
  "prompt": "Hãy dùng NSVisualEffectView cho phần nền Visual Effect Material này (SwiftUI: Material). Chọn NSVisualEffectView.Material theo mục đích ngữ nghĩa và đặt BlendingMode phù hợp; để các control chuẩn tự cấp vibrancy thay vì dựng lại hiệu ứng bằng độ mờ và độ trong suốt cố định.",
  "debug": "Hãy giúp tôi gỡ lỗi vibrancy trên macOS (NSVisualEffectView). Loại trừ lần lượt các khả năng sau: dùng sai material cho bề mặt (sidebar, menu, popover, hudWindow là các loại khác nhau); blendingMode là withinWindow trong khi định dùng behindWindow nên không có gì xuyên qua; chữ/control vibrant không tác dụng vì không phải con cháu của effect view; mọi thứ chuyển xám khi cửa sổ mất focus do state followsWindowActiveState. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSVisualEffectView"
   },
   {
    "lang": "AppKit",
    "text": "NSVisualEffectView.Material"
   },
   {
    "lang": "AppKit",
    "text": "NSVisualEffectView.BlendingMode"
   },
   {
    "lang": "SwiftUI",
    "text": "Material"
   }
  ],
  "see": [
   "macos/sidebar",
   "macos/panel",
   "macos/popover",
   "macos/menu-bar-extra"
  ]
 },
 "macos/window": {
  "lead": "Rê chuột lên từng con số; mỗi phần của chrome cửa sổ đều có tên gọi riêng",
  "sym": [
   "NSWindow",
   "WindowGroup"
  ],
  "aka": [
   "app window",
   "document window",
   "NSWindow",
   "window frame"
  ],
  "def": "Cửa sổ Mac là khung di chuyển được, thường đổi cỡ được, chứa một bề mặt của ứng dụng. Phần chrome phía trên của nó có thể gộp thanh tiêu đề kéo được, tiêu đề, toolbar, accessory và các tab tài liệu, trong khi ba nút đỏ, vàng, xanh lá (traffic lights) vẫn là những control chuẩn riêng biệt. Window tab thuộc về khung cửa sổ và gom các cửa sổ riêng lẻ lại; còn tab view nằm trong nội dung chỉ chuyển đổi nội dung bên trong một cửa sổ.",
  "phrases": [
   "cả cái hộp ứng dụng Mac trên màn hình",
   "phần đỉnh cửa sổ nơi bạn có thể kéo nó đi",
   "cái control nhỏ nằm trong thanh tiêu đề",
   "một nút cạnh các chấm đèn giao thông",
   "các tab tích hợp sẵn trong khung cửa sổ Mac",
   "cái chỗ nắm nhỏ xíu ở góc để đổi cỡ cửa sổ"
  ],
  "anatomy": [
   {
    "n": "Title bar",
    "sym": "NSWindow.titleVisibility",
    "d": "\"Dải chạy ngang đỉnh cửa sổ\" là title bar, nó vẫn có thể tồn tại dù chữ tiêu đề đã bị ẩn."
   },
   {
    "n": "Window drag region",
    "sym": "NSWindow.isMovableByWindowBackground",
    "d": "Vùng trống bạn nắm để di chuyển cửa sổ là drag region của nó, không nhất thiết là chỗ có chữ tiêu đề nhìn thấy."
   },
   {
    "n": "Window title",
    "sym": "NSWindow.title",
    "d": "Tên tài liệu hoặc màn hình in trên thanh tiêu đề là window title."
   },
   {
    "n": "Unified toolbar",
    "sym": "NSWindow.ToolbarStyle.unified",
    "d": "Khi tiêu đề và các hành động của cửa sổ dùng chung một hàng trên cùng, phần chrome đó dùng kiểu unified toolbar."
   },
   {
    "n": "Toolbar item",
    "sym": "NSToolbarItem",
    "d": "Một nút, ô nhập hay khoảng trống co giãn đặt trên toolbar của cửa sổ là một toolbar item."
   },
   {
    "n": "Title-bar accessory",
    "sym": "NSTitlebarAccessoryViewController",
    "d": "\"Cái control nhỏ trong thanh tiêu đề\" là title-bar accessory, tách biệt với cả toolbar lẫn traffic lights."
   },
   {
    "n": "Title-bar separator",
    "sym": "NSWindow.titlebarSeparatorStyle",
    "d": "Đường kẻ mảnh giữa phần chrome trên cùng của cửa sổ và nội dung của nó là title-bar separator."
   },
   {
    "n": "Window tabs",
    "sym": "NSWindowTabGroup",
    "d": "Các tab nằm trong khung cửa sổ gom những cửa sổ tài liệu riêng lẻ; chúng không phải một NSTabView nằm trong vùng nội dung."
   },
   {
    "n": "Resize edge / corner",
    "sym": "NSWindow.StyleMask.resizable",
    "d": "\"Chỗ nắm nhỏ ở góc\" nghĩa là cạnh hoặc góc đổi cỡ (resize edge/corner), vốn có thể tương tác được dù không vẽ ra tay nắm nào."
   }
  ],
  "prompt": "Hãy dựng phần này thành Window native của Mac (NSWindow; SwiftUI: Window hoặc WindowGroup). Phân biệt vùng thanh tiêu đề kéo được với NSWindow.title, dùng NSToolbar để có chrome kiểu unified, gắn các control tuỳ biến lên thanh tiêu đề bằng NSTitlebarAccessoryViewController, và giữ nguyên window tabs cùng các cạnh đổi cỡ native.",
  "debug": "Hãy giúp tôi gỡ lỗi cửa sổ trên macOS (NSWindow). Loại trừ lần lượt các khả năng sau: nội dung chui xuống dưới thanh tiêu đề vì đã đặt fullSizeContentView cùng thanh tiêu đề trong suốt; cửa sổ không kéo được ở chỗ mong muốn, cần phân biệt isMovableByWindowBackground với vùng thanh tiêu đề kéo được; phím gõ đi vào hư không vì first responder đã bị xoá; frame autosave khôi phục vị trí cũ đè lên setFrame bạn đặt tay. Triệu chứng của tôi là:",
  "code": [
   {
    "lang": "AppKit",
    "text": "NSWindow"
   },
   {
    "lang": "SwiftUI",
    "text": "WindowGroup"
   },
   {
    "lang": "SwiftUI",
    "text": "Window"
   },
   {
    "lang": "AppKit",
    "text": "NSWindowController"
   }
  ],
  "see": [
   "macos/traffic-lights",
   "macos/toolbar",
   "macos/split-view",
   "macos/sidebar"
  ]
 },
 "page/methodology": {
  "title": "Phương pháp làm ra cuốn từ điển",
  "lead": "NameThatUI bắt đầu từ một thứ ai cũng nhìn thấy nhưng khó gọi tên. Trước tiên chúng tôi xác định phần giao diện đó, rồi đối chiếu thuật ngữ với tài liệu chính thức của nền tảng, các chuẩn về khả năng tiếp cận và API đang được dùng thật, sau đó mới thêm mục.",
  "sections": [
   {
    "h": "Một thuật ngữ được thêm vào thế nào",
    "p": [
     "• Bắt đầu từ điểm ảnh. Thuật ngữ phải trỏ tới thứ nhìn thấy được và thật sự khó diễn tả. Chúng tôi không thêm tên chỉ vì nghe có vẻ hữu ích.",
     "• Kiểm tra nền tảng. Tên người dùng thấy được xác minh trong hướng dẫn của nền tảng, tên dùng trong code được xác minh trong tài liệu framework, còn vai trò hay hành vi hỗ trợ tiếp cận được xác minh theo chuẩn liên quan.",
     "• Làm cho sự khác biệt nhìn thấy được. Phần demo, sơ đồ cấu tạo và lời giải thích bằng ngôn ngữ thường phải giúp phân biệt thuật ngữ với những thứ giống nó nhất, mà không đòi người đọc phải biết sẵn từ vựng."
    ]
   },
   {
    "h": "Các nguồn chúng tôi tham khảo",
    "p": [
     "Nguồn nào được dùng tùy vào điều đang khẳng định. Một bộ hướng dẫn thiết kế có thể đặt tên cho một mẫu hình nhìn thấy được, một đặc tả xác định ngữ nghĩa của nó, còn tài liệu framework cung cấp đúng ký hiệu mà lập trình viên sẽ gõ.",
     "• Nền tảng Apple: thuật ngữ thành phần, hành vi của nền tảng, cấu tạo đã được tài liệu hóa, cùng các ký hiệu SwiftUI, AppKit và UIKit chính xác. Nguồn: Human Interface Guidelines và Developer Documentation.",
     "• Mẫu web có thể tiếp cận: vai trò và thuộc tính ARIA, các mẫu widget đã được công nhận, cách tương tác bằng bàn phím và yêu cầu về khả năng tiếp cận. Nguồn: WAI-ARIA, ARIA APG và WCAG.",
     "• Nền tảng web: ngữ nghĩa và hành vi HTML gốc, API của trình duyệt, bối cảnh triển khai và ghi chú về khả năng tương thích. Nguồn: WHATWG HTML và MDN Web Docs."
    ]
   },
   {
    "h": "Những gì các lượt tìm kiếm thật dạy chúng tôi",
    "p": [
     "Tài liệu chính thức cho biết một thứ được gọi là gì, còn các lượt tìm kiếm thật cho biết người ta gọi nó thế nào khi chưa biết tên. Chúng tôi nghiên cứu các lượt tìm không ra kết quả ở dạng tổng hợp, các đáp án đã được xác nhận và những chỗ được sửa lại, để cải thiện các cụm từ dẫn tới từng mục.",
     "Cách nói đó giúp dễ tìm hơn và làm lời giải thích dễ hiểu hơn; nó không được lấn át một chuẩn hay bịa ra tên thành phần. Chúng tôi không công bố nhật ký truy vấn thô."
    ]
   },
   {
    "h": "Khi các tên không thống nhất",
    "p": [
     "Cùng một phần tử trông giống nhau có thể mang tên khác nhau trên web và macOS, thậm chí khác nhau giữa AppKit và SwiftUI. Chúng tôi giữ nền tảng gắn với thuật ngữ, ưu tiên cách gọi của chủ sở hữu nền tảng cho API của họ, và hiển thị các tên thay thế hữu ích thay vì giả vờ có một bộ từ vựng chung cho tất cả.",
     "NameThatUI do Argo tự nghiên cứu, xây dựng và duy trì. Site không liên kết hay được bảo trợ bởi các đơn vị xuất bản được dẫn link ở trên."
    ]
   }
  ]
 },
 "page/sponsor": {
  "title": "Tài trợ cho cuốn từ điển UI",
  "lead": "Mỗi lần chỉ có một nhà tài trợ, giá $500 một tháng. Tên bạn nằm phía trên header của mọi trang, và ảnh của bạn xuất hiện ở mọi trang thuật ngữ. Người xem là designer và developer, đúng lúc họ đang mô tả cho coding agent xem cần dựng gì.",
  "sections": [
   {
    "h": "Vị trí tài trợ đang trống",
    "p": [
     "Người đọc có thể bấm Become the sponsor để đăng ký vị trí này."
    ]
   },
   {
    "h": "Lượng người xem",
    "p": [
     "Hơn 71,723 lượt xem trang kể từ khi ra mắt vào ngày 12 tháng 7 năm 2026. Số liệu lấy từ Cloudflare Analytics bên thứ nhất, làm mới mỗi giờ, không dùng cookie.",
     "Phạm vi toàn cầu: đã chạm tới 146 quốc gia."
    ]
   },
   {
    "h": "Vị trí tài trợ",
    "p": [
     "$500 mỗi tháng, mỗi lần chỉ một nhà tài trợ. Gia hạn theo tháng, hủy lúc nào cũng được. Khoản đã thanh toán không hoàn lại.",
     "Phần minh họa trên trang cho thấy cách hiển thị: tên sản phẩm cùng một dòng mô tả dài tối đa khoảng 60 ký tự ở phía trên header, kèm đường dẫn như yourproduct.com."
    ]
   },
   {
    "h": "Bạn nhận được gì",
    "p": [
     "Bạn là nhà tài trợ duy nhất trên site: không xoay vòng, không ai đứng cạnh. Hãy gửi tên, đường dẫn, một dòng giới thiệu và một ảnh 1200 × 630, đúng cỡ ảnh xem trước khi chia sẻ mạng xã hội nên nhiều khả năng bạn đã có sẵn. Mọi thứ đều được xác nhận qua email trước khi lên sóng, và những thương hiệu không hợp với đối tượng người đọc sẽ bị từ chối.",
     "• Tên của bạn cùng một dòng nói về sản phẩm, đặt phía trên header ở mọi trang.",
     "• Ảnh của bạn nằm dưới phần demo trên mọi trang thuật ngữ, và luôn hiện trong tầm mắt khi người ta đọc."
    ]
   },
   {
    "h": "Những gì cố ý không có",
    "p": [
     "• Không có pixel theo dõi và không có script bên thứ ba. Đường dẫn mang thuộc tính rel=“sponsored”.",
     "• Không can thiệp vào các mục, định nghĩa hay thứ hạng tìm kiếm. Từ điển vẫn giữ tính biên tập.",
     "• Không cam kết số lượt nhấp hay chuyển đổi. Bạn đang tài trợ cho một site tham khảo còn non trẻ và lớn rất nhanh."
    ]
   },
   {
    "h": "Mọi chuyện bắt đầu từ một bài đăng",
    "p": [
     "Bài thông báo đạt 820k lượt xem và được lưu nhiều hơn được thích: 9.5k người đã lưu để quay lại sau.",
     "Bài đăng của @argofowl giới thiệu namethatui.com, một cuốn từ điển cho những thứ trong giao diện mà bạn nhìn thấy nhưng không biết gọi là gì. Tác giả làm nó vì chủ yếu là designer, và rào cản lớn nhất xưa nay là không biết các thứ tên gì khi ra lệnh cho agent.",
     "Thống kê của bài gồm 6.9k like, 9.5k bookmark, 207 reply và 820k view. Có thể đọc bài gốc trên X."
    ]
   },
   {
    "h": "Những người đọc đầu tiên nói gì",
    "p": [
     "Trang gốc trích lại một số phản hồi công khai của người dùng trên X cho bài ra mắt, kèm liên kết về từng bài. Nội dung các phản hồi của người khác không được nhắc lại ở đây; xem trực tiếp trên trang gốc."
    ]
   },
   {
    "h": "Muốn có vị trí này?",
    "p": [
     "Hãy cho biết bạn là ai và làm gì. Chúng tôi sẽ xác nhận dòng giới thiệu, đường dẫn và ảnh qua email, và nếu hợp thì bạn có thể lên sóng ngay trong ngày.",
     "Biểu mẫu gồm Name, Email, Message và nút Send inquiry. Nội dung đi thẳng vào hộp thư của người làm site, không có danh sách gửi thư, không theo dõi.",
     "Thích email thuần hơn? Gửi tới sponsor@namethatui.com."
    ]
   }
  ]
 },
 "page/styles": {
  "title": "Name That Vibe: atlas các phong cách thị giác",
  "lead": "Atlas các phong cách thị giác. Bạn nhận ra vẻ ngoài, biết tên thật của nó cùng 3 đến 5 dấu hiệu tạo nên nó, và phân biệt được nó với phong cách giống nhất. Sau đó chép một bản brief để coding agent dựng theo.",
  "sections": [
   {
    "h": "Name that vibe: đây là phong cách gì?",
    "p": [
     "Ô tìm kiếm nhận mô tả vụng về, ví dụ như các câu dưới đây.",
     "Nếu thứ bạn tìm là một control chứ không phải một phong cách, hãy chuyển sang mục duyệt các phần tử UI.",
     "• các nút mềm như bị đẩy nhô ra khỏi nền",
     "• các thẻ mờ như kính đục đặt trên hình nền nhiều màu",
     "• khối màu sáng có viền đen và bóng cứng",
     "• bóng bóng bóng loáng, cỏ xanh, cửa sổ cũ, tương lai",
     "• giao diện kẹo cao su crôm của thời điểm bước sang thiên niên kỷ mới"
    ]
   },
   {
    "h": "Một atlas có kiểm soát, không phải bãi chứa phong cách",
    "p": [
     "Không có danh sách trung thực nào gồm 'mọi phong cách thiết kế'. Một phong cách chỉ được đưa vào đây khi có nguồn đáng tin, nhãn cho biết tình trạng thuật ngữ, các dấu hiệu định nghĩa có thể bảo vệ được và một mẫu vật mà bạn thật sự nhận ra.",
     "Các phong cách đang được nghiên cứu gồm Internet Ugly, Vaporwave, Memphis, Art Nouveau, Art Deco, Bauhaus và Swiss Style."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Skeuomorphism: Câu tìm: 'app trông như cuốn sổ da thật'. Dấu hiệu: mô phỏng chất liệu thật, mô hình ánh sáng vật lý, ẩn dụ đồ vật có thật.",
     "Neumorphism: Xu hướng do giới ngành đặt tên. Câu tìm: 'các nút mềm như bị đẩy nhô ra khỏi nền'. Dấu hiệu: một bề mặt liền mạch, cặp bóng mềm đôi, trạng thái nhấn lõm vào.",
     "Glassmorphism: Xu hướng do giới ngành đặt tên. Câu tìm: 'các thẻ mờ như kính đục đặt trên hình nền nhiều màu'. Dấu hiệu: tấm trong mờ như kính nhám, nền rực rỡ lộ xuyên qua, viền sáng mỏng.",
     "Liquid Glass: Ngôn ngữ thiết kế của nhà sản xuất. Câu tìm: 'thiết kế mới của apple mà nút trông như giọt nước'. Dấu hiệu: kính là lớp điều khiển, hiệu ứng thấu kính chứ không chỉ làm mờ, tự đổi sắc theo nền.",
     "Web Brutalism: Nhãn còn gây tranh cãi. Câu tìm: 'website html thô xấu xí'. Dấu hiệu: chất liệu mặc định của trình duyệt, cấu trúc tài liệu phơi ra, hoàn toàn không có hiệu ứng trang trí.",
     "Neobrutalism: Xu hướng do giới ngành đặt tên. Câu tìm: 'khối màu sáng có viền đen và bóng cứng'. Dấu hiệu: viền đen dày, bóng đổ lệch cứng, khối màu phẳng bão hòa.",
     "Y2K Digital Aesthetic: Nhãn hồi tưởng. Câu tìm: 'giao diện kẹo cao su crôm của thời điểm bước sang thiên niên kỷ mới'. Dấu hiệu: crôm lỏng và kim loại, gel và nhựa bóng, bảng màu xanh bạc ánh cầu vồng.",
     "Frutiger Aero: Nhãn hồi tưởng. Câu tìm: 'bóng bóng loáng, cỏ xanh, cửa sổ cũ, tương lai'. Dấu hiệu: thiên nhiên hòa với công nghệ, bề mặt kính và aqua bóng, bảng màu xanh trời và xanh cỏ.",
     "Flat Design: Câu tìm: 'mọi thứ chỉ là màu đặc, không có bóng'. Dấu hiệu: mảng màu đặc 2D, không mô phỏng chiều sâu, biểu tượng glyph đơn giản.",
     "Minimalism: Câu tìm: 'trang gần như không có gì'. Dấu hiệu: khoảng trống được dùng như vật liệu, số phần tử bị hạn chế, bảng màu hạn chế hoặc đơn sắc.",
     "Claymorphism: Xu hướng do giới ngành đặt tên. Câu tìm: 'nút 3D phồng như đất nặn'. Dấu hiệu: hai bóng trong cộng một bóng ngoài, bo góc rất lớn, các vật thể lơ lửng tô màu riêng biệt.",
     "Vernacular Web: Nhãn hồi tưởng. Câu tìm: 'trang geocities cũ đầy gif lấp lánh'. Dấu hiệu: họa tiết nền lát gạch, gif động làm đồ trang trí, huy hiệu và bộ đếm sưu tầm.",
     "Aqua: Ngôn ngữ thiết kế của nhà sản xuất. Câu tìm: 'nút Mac đời cũ trông như kẹo xanh'. Dấu hiệu: control dạng gel kẹo, bề mặt kẻ sọc, nút cửa sổ như viên kẹo gôm.",
     "Windows Aero: Ngôn ngữ thiết kế của nhà sản xuất. Câu tìm: 'viền cửa sổ trong suốt của windows 7'. Dấu hiệu: khung cửa sổ trong suốt có làm mờ, vệt phản chiếu và ánh sáng quét, control phát sáng khi rê chuột."
    ]
   }
  ]
 },
 "styles/aqua": {
  "title": "Aqua",
  "lead": "Aqua là ngôn ngữ thiết kế mà Mac OS X ra mắt cùng vào năm 2000: control được vẽ như kẹo gel trong mờ, với vệt sáng phản chiếu sâu trên nền xanh nước phát sáng, đặt lên bề mặt kẻ sọc nhỏ. Cửa sổ có ba nút đỏ, vàng, xanh tròn như viên kẹo gôm, bóng đổ mềm xếp lớp các cửa sổ, và chuyển động mượt khắp nơi (nút mặc định thật sự nhấp nháy như đang thở, còn cửa sổ thu vào Dock bằng hiệu ứng genie). Apple quảng bá nó như một giao diện có độ lỏng và chiều sâu của nước.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: ngôn ngữ thiết kế của nhà sản xuất. Đây là tên chính thức mà Apple đặt cho giao diện của Mac OS X, do Steve Jobs công bố tại Macworld vào tháng 1 năm 2000, với câu nói rằng các nút trên màn hình trông đẹp tới mức bạn sẽ muốn liếm chúng.",
     "Còn được gọi là: Aqua interface, Mac OS X Aqua.",
     "Minh họa trên trang: nút Save màu xanh dạng gel nhấp nháy, vì Apple từng cho nút mặc định ở trạng thái thở."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "Mục này chỉ nói về Aqua nguyên bản của thập niên 2000, từ Mac OS X 10.0 đến khoảng Tiger. Các bản macOS sau đó làm phẳng và phủ mờ ngôn ngữ này dần dần, nên đừng trộn thời kim loại chải, Yosemite hay macOS hiện nay vào đây; ngôn ngữ kính hiện tại của Apple là Liquid Glass."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Aqua.",
     "• các nút Mac đời cũ trông như kẹo xanh",
     "• nút gel mà bạn muốn liếm",
     "• cửa sổ kẻ sọc của Mac OS X thời đầu",
     "• ba nút cửa sổ đỏ vàng xanh như kẹo gôm",
     "• thanh cuộn xanh bóng trên Mac cũ",
     "• nút Save nhấp nháy như đang thở"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• Candy-gel controls (chiều sâu và ánh sáng): nút và núm thanh cuộn trông như giọt gel trong mờ, có vệt sáng phản chiếu ở phần trên, quầng sáng bên trong ở dưới và màu như được thắp từ trong ra.",
     "• Pinstriped surfaces (bề mặt và chất liệu): nền cửa sổ và title bar mang các sọc sáng tối xen kẽ rất mảnh, dấu ấn nhận diện của lớp vỏ Aqua.",
     "• Gumdrop window controls (hình học và viền): bộ ba đóng/thu nhỏ/phóng to là các quả cầu kẹo bóng đỏ, vàng, xanh ở góc trên trái của title bar.",
     "• Luminous water blue (màu và độ tương phản): bảng màu xoay quanh chính cái tên Aqua, tức xanh nước bão hòa như được chiếu sáng, dùng cho nút mặc định, vùng chọn, thanh cuộn và tiến độ."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng bề mặt theo ngôn ngữ thiết kế Aqua gốc của Apple (Mac OS X thời đầu). Dấu hiệu định nghĩa: control dạng gel kẹo, nền xanh nước phát sáng với vệt sáng phản chiếu ở nửa trên và quầng sáng bên trong, ví dụ lớp radial-gradient làm vệt sáng đặt trên linear-gradient(#5f9ff5, #1862d8); bề mặt cửa sổ kẻ sọc mảnh (repeating-linear-gradient, sọc khoảng 1px, tương phản thấp); nút cửa sổ đỏ/vàng/xanh dạng cầu bóng ở góc trên trái; nút mặc định nhấp nháy nhẹ (vòng sáng chậm, tắt khi có prefers-reduced-motion); bóng cửa sổ mềm và sâu. Giữ bố cục và mật độ linh hoạt, vì đây là phần vỏ và control chứ không phải hệ thống bố cục. Đừng trôi sang glassmorphism chung chung: chất liệu của Aqua là gel đục bóng trên nền kẻ sọc, không phải các tấm kính mờ nhòe. Giữ độ tương phản chữ 4.5:1 trên nền gel (chữ trắng kèm bóng đổ nhẹ là đúng thời đó), trạng thái focus bàn phím đầy đủ, và phương án thay thế cho hiệu ứng nhấp nháy khi người dùng giảm chuyển động."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Aqua và Y2K Digital Aesthetic, với app mẫu có màn Welcome back, ô email và nút Continue/Cancel.",
     "Y2K Digital Aesthetic: Đây là Aqua vì nó là ngôn ngữ hệ điều hành hoàn chỉnh, có hệ thống của một hãng duy nhất, với cùng nút gel, sọc và nút kẹo gôm trên mọi chiếc Mac. Nó chỉ là Y2K nếu là kiểu tương lai học tự do của thời đó (crôm lỏng, lens flare, chữ công nghệ) mà không có hệ thống riêng của Apple đứng sau. Aqua là hòn đảo mang hình hệ điều hành giữa biển Y2K.",
     "So với Windows Aero: Đây là Aqua vì chất liệu là gel kẹo, tức màu đục phát sáng và bóng, nằm trên nền kẻ sọc. Nó sẽ thành Windows Aero nếu kẹo biến thành kiến trúc: những KHUNG cửa sổ kính trong, mờ, cho thấy màn hình nền qua chúng.",
     "So với Skeuomorphism: Đây là Aqua vì độ bóng là chất liệu riêng của hãng, không phải bắt chước, và nút gel không giả làm một vật thật nào. Nó sẽ thành skeuomorphism nếu bề mặt bắt đầu mô phỏng những thứ gọi tên được như lịch da, sổ giấy, máy phát kim loại chải (điều mà Apple quả thực chồng lên Aqua về sau)."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Chiều sâu và ánh sáng, cốt lõi: Candy-gel controls. Nút và núm thanh cuộn trông như giọt gel trong mờ, có vệt sáng ở trên, quầng sáng bên trong dưới và màu như thắp từ trong ra.",
     "• Chiều sâu và ánh sáng, phụ trợ: Soft window shadows. Bóng đổ sâu và mềm làm cửa sổ nổi thành các lớp thật trên màn hình nền, kiểu chiều sâu mà Mac OS 9 chưa từng có.",
     "• Chiều sâu và ánh sáng, nên tránh: Flat frosted translucency. Một tấm mờ nhòe không có độ bóng gel là ý tưởng khác, ra đời sau, thuộc địa hạt glassmorphism/vibrancy chứ không phải Aqua.",
     "• Bề mặt và chất liệu, cốt lõi: Pinstriped surfaces. Nền cửa sổ và title bar mang các sọc sáng tối xen kẽ mảnh, dấu ấn đặc trưng của Aqua.",
     "• Hình học và viền, cốt lõi: Gumdrop window controls. Bộ ba đóng/thu nhỏ/phóng to là các quả cầu kẹo bóng đỏ, vàng, xanh ở góc trên trái title bar.",
     "• Màu và độ tương phản, cốt lõi: Luminous water blue. Bảng màu xoay quanh xanh nước bão hòa như được chiếu sáng, cho nút mặc định, vùng chọn, thanh cuộn và tiến độ.",
     "• Chuyển động, phụ trợ: Fluid, liquid motion. Nút mặc định nhấp nháy như thở, còn cửa sổ thu nhỏ qua hiệu ứng genie như chất lỏng; chuyển động giúp bán ẩn dụ nước."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• CSS cho nút gel: radial-gradient làm vệt sáng ở trên, linear-gradient từ #6aa6f8 qua #1862d8 tới #0c4cc0, box-shadow gồm inset sáng trên và dưới cùng một bóng ngoài, border-radius: 999px. Ý: vệt sáng ở đỉnh, quầng sáng trong, hình viên thuốc.",
     "• CSS cho sọc: repeating-linear-gradient 180deg luân phiên #f2f4f7 và #e7eaef, mỗi sọc 2px. Dùng cho vỏ cửa sổ và nền.",
     "• CSS cho nhịp thở: @keyframes aqua-pulse đổi brightness và saturate ở giữa chu kỳ, chạy 1.8s ease-in-out infinite. Nút mặc định thở; nhớ chặn sau prefers-reduced-motion."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• Chữ trắng trên gel xanh vừa nằm sát ngưỡng tương phản; giữ phần giữa của gel đủ tối để đạt 4.5:1, như cách gradient tối ở đáy của chính Apple.",
     "• Nút mặc định nhấp nháy là chuyển động không mang thông tin; hãy dừng nó khi có prefers-reduced-motion và đừng để nhịp nháy là dấu hiệu duy nhất cho hành động mặc định.",
     "• Sọc phía sau chữ nhỏ gây nhiễu thị giác; hãy giảm tương phản của sọc xuống 2 đến 3 phần trăm hoặc che chúng sau các panel nội dung."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Do Steve Jobs giới thiệu tại Macworld San Francisco tháng 1 năm 2000, cùng lúc Mac OS X ra mắt công chúng. Aqua có mặt trong Mac OS X 10.0 (2001) và định hình diện mạo Mac suốt thập kỷ, độ bóng gel vang lại phần cứng iMac trong mờ của thời đó.",
     "Nguồn: bài của Apple Newsroom năm 2000 về việc Apple giới thiệu Mac OS X (công bố Aqua), và bài của John Siracusa trên Ars Technica về Mac OS X DP3 và màn ra mắt của Aqua."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Y2K Digital Aesthetic: Phong cách (Style)",
     "Windows Aero: Phong cách (Style)",
     "Skeuomorphism: Phong cách (Style)",
     "Liquid Glass: Phong cách (Style)",
     "Traffic Lights (Window Controls) (macos): Phần tử macOS"
    ]
   }
  ],
  "card": {
   "label": "Ngôn ngữ thiết kế của nhà sản xuất",
   "quote": "nút Mac đời cũ trông như kẹo xanh",
   "tags": [
    "control dạng gel kẹo",
    "bề mặt kẻ sọc",
    "nút cửa sổ như viên kẹo gôm"
   ]
  }
 },
 "styles/claymorphism": {
  "title": "Claymorphism",
  "lead": "Claymorphism làm phần tử giao diện trông như nặn từ đất sét mềm: góc bo thật tròn, màu nền pastel nhạt, cùng công thức đặc trưng gồm hai bóng trong (một bóng sáng bắt cạnh trên, một bóng tối hơn phủ phía dưới) và một bóng ngoài mềm để nâng vật thể nổi lên khỏi trang. Mỗi phần tử có màu riêng và tách rõ khỏi nền, thường đi cùng các hình minh họa 3D 'đất sét' mập mạp.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: xu hướng do giới ngành đặt tên.",
     "Do Michal Malewicz (HYPE4 Academy) đặt ra năm 2021, nối tiếp chuỗi cách gọi kiểu '-morphism'; năm 2022 Smashing Magazine có một bài phân tích kỹ thuật riêng về nó.",
     "Còn được gọi là: clay UI, claymorphic design.",
     "Bấm nút trên minh họa: đất sét bị ép xẹp và giữ nguyên trạng thái nhấn."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "Mục này chỉ nói về cách xử lý giao diện. Phong cách minh họa nhân vật 3D đi kèm (người phồng kiểu Blender với da nhựa mịn) thường đi theo nó, nhưng đó là mốt minh họa chứ không phải phong cách giao diện."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Claymorphism.",
     "• nút 3D phồng như đất nặn",
     "• các thẻ trông như bơm phồng như bóng bay",
     "• giao diện dễ thương, nhìn bóp được",
     "• nút tròn tròn, ruột mềm như bãi nhão",
     "• phong cách minh họa đất sét 3D cho dashboard",
     "• mọi thứ trông như đồ chơi cao su mềm"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• Two inner shadows + one outer (chiều sâu và ánh sáng): công thức đặc trưng: bóng trong sáng ở trên, bóng trong tối hơn ở dưới, và một bóng ngoài mềm bên dưới; bề mặt đọc thành phồng lên chứ không phải khắc lõm.",
     "• Oversized corner radii (hình học và viền): góc bo tròn cực đại, bán kính khoảng một phần ba chiều cao phần tử, nên mọi hình trông như một cục mềm chứ không bao giờ là thẻ bo góc.",
     "• Independently colored, floating objects (bề mặt và chất liệu): mỗi phần tử có màu nền riêng khác với nền trang và nổi rõ lên trên đó; không có gì được đùn ra từ chính trang."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng bề mặt theo claymorphism. Dấu hiệu định nghĩa: công thức bóng đất sét cho thẻ và nút, gồm hai bóng trong (sáng ở trên, tối hơn ở dưới) cộng một bóng ngoài mềm, ví dụ trong box-shadow dùng bóng ngoài 0 24px 40px alpha .18, bóng trong dưới 0 -8px 16px alpha .15 và bóng trong trên 0 8px 16px màu trắng alpha .55; góc bo rất lớn (border-radius khoảng 26px trên control cao 56px); mỗi phần tử một màu pastel nhạt riêng, nổi rõ trên nền pha màu mềm; kiểu chữ dày dặn thân thiện. Giữ linh hoạt sắc độ chính xác và phần minh họa. Đừng trôi sang neumorphism: điểm quyết định là vật thể đất sét có màu riêng và bóng đổ nhìn thấy được, chứ không dùng màu của nền rồi để bóng gợi hình. Giữ tương phản chữ 4.5:1 trên nền pastel, trạng thái nhấn/hover làm bóng trong sâu hơn thay vì bỏ chúng đi, và vòng focus nhìn thấy được."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Claymorphism và Neumorphism, với app mẫu có màn Welcome back, ô email và nút Continue/Cancel.",
     "Neumorphism: Đây là claymorphism vì mỗi phần tử phồng được tô màu riêng và NỔI trên nền nhờ một bóng đổ thật. Nó sẽ thành neumorphism nếu mọi phần tử lấy đúng màu nền và nằm phẳng trong bề mặt, chỉ có cặp bóng sáng/tối gợi hình, như được đúc từ một chất liệu liền mạch thay vì đặt lên trên.",
     "So với Skeuomorphism: Đây là claymorphism vì chất liệu là thứ đồ chơi tự nghĩ ra, không bắt chước đồ vật hay bề mặt nào ngoài đời. Nó sẽ thành skeuomorphism nếu khối mềm bắt đầu mô phỏng những thứ vật lý gọi tên được như vân da, kim loại chải hay một chiếc máy tính thật."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Chiều sâu và ánh sáng, cốt lõi: Two inner shadows + one outer. Công thức đặc trưng: bóng trong sáng ở trên, bóng trong tối hơn ở dưới, cộng bóng ngoài mềm bên dưới, khiến bề mặt đọc thành phồng chứ không khắc.",
     "• Hình học và viền, cốt lõi: Oversized corner radii. Góc tròn cực mạnh, bán kính cỡ một phần ba chiều cao phần tử, nên mọi hình đọc như một cục mềm chứ không phải thẻ bo góc.",
     "• Bề mặt và chất liệu, cốt lõi: Independently colored, floating objects. Mỗi phần tử có màu nền riêng khác với nền và nổi rõ lên trên; không có gì được đùn ra từ chính trang.",
     "• Bề mặt và chất liệu, nên tránh: Element same color as background. Nếu màu của vật thể trùng với trang và chỉ có bóng gợi hình, bạn đã trượt sang neumorphism; vật thể đất sét luôn có màu riêng.",
     "• Màu và độ tương phản, phụ trợ: Light pastel palette. Tím oải hương, bạc hà, san hô và kem sữa; bóng cần nền sáng mới đọc ra khối, và tâm trạng đồ chơi cần sự mềm mại đó.",
     "• Hình ảnh và đồ trang trí, phụ trợ: 3D clay illustration. Nhân vật và vật thể 3D phồng, mịn thường đi kèm control và tạo không khí thế giới đồ chơi chung."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• CSS cho công thức đầy đủ: border-radius 26px, nền #f4e7fd, box-shadow gồm một bóng ngoài lớn và hai bóng trong (tối ở dưới, trắng sáng ở trên) với màu tím nhạt rgba(120,90,180,...). Đây là trọn bộ công thức, một bóng ngoài cộng hai bóng trong.",
     "• CSS cho trạng thái nhấn (active): bóng ngoài thu nhỏ, bóng trong dưới đậm hơn và bóng trong trên đổi thành tối nhẹ. Nhấn xuống làm đất sét bị ép: bóng ngoài co lại, ánh sáng phía trên đảo chiều.",
     "• Tailwind: rounded-[26px] bg-violet-100 cùng một giá trị shadow tùy ý mang đủ ba lớp bóng của công thức trên."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• Bẫy là pastel trên pastel: chữ trắng hoặc kem trên nền bạc hà/oải hương thường không đạt 4.5:1; hãy làm chữ đậm hơn chứ đừng làm tối bảng màu đồ chơi.",
     "• Bóng mềm chỉ để trang trí, không biểu thị trạng thái; hãy kết hợp trạng thái nhấn/chọn với đổi màu hoặc đổi nội dung, đừng chỉ dựa vào độ sâu của bóng.",
     "• Bóng ba lớp trên nhiều phần tử có thể rung nhấp nháy khi cuộn ở chế độ tiết kiệm điện; chỉ dùng công thức này cho các bề mặt quan trọng."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Được Michal Malewicz đặt tên năm 2021 như người kế nhiệm thân thiện hơn của neumorphism, đi theo làn sóng minh họa 3D mềm trong tiếp thị fintech và edtech; công thức (hai bóng trong cộng một bóng ngoài, bo góc lớn) lấy từ bài viết gốc của ông.",
     "Nguồn: HYPE4 Academy với bài Claymorphism in User Interfaces (bài đặt tên), và Smashing Magazine với bài viết về Claymorphism như một xu hướng thiết kế UI mới bằng CSS."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Neumorphism: Phong cách (Style)",
     "Neobrutalism: Phong cách (Style)",
     "Glassmorphism: Phong cách (Style)"
    ]
   }
  ],
  "card": {
   "label": "Xu hướng do giới ngành đặt tên",
   "quote": "nút 3D phồng như đất nặn",
   "tags": [
    "hai bóng trong cộng một bóng ngoài",
    "bo góc rất lớn",
    "các vật thể lơ lửng tô màu riêng biệt"
   ]
  }
 },
 "styles/flat-design": {
  "title": "Flat Design",
  "lead": "Flat Design dựng giao diện thuần 2D: bề mặt là mảng màu đặc, biểu tượng là glyph hình học đơn giản, và không thứ gì giả vờ được chiếu sáng, đắp nổi hay làm từ một chất liệu nào. Thứ bậc đến từ màu, kích cỡ và kiểu chữ thay cho bóng và vát cạnh. Nó thành diện mạo thống trị quanh 2012 đến 2013 (Metro của Windows 8, rồi iOS 7) như sự bác bỏ trực diện độ bóng và vân chất liệu của skeuomorphism.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: phong trào đã được thiết lập.",
     "Từ vựng chuẩn của ngành từ khoảng 2012, tên mà làn sóng phản đối skeuomorphism tự gọi mình; NN/g ghi lại cả định nghĩa lẫn lịch sử của nó.",
     "Còn được gọi là: flat UI, flat 2.0 (khi quay lại thêm một chút chiều sâu).",
     "Minh họa: màn hình Start của Windows 8, vụ nổ lớn của flat. Chạm ô thời tiết thì trạng thái chỉ là đổi nội dung chứ không bao giờ là bóng đổ."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "Mục này chỉ nói về cách vẽ phẳng nghiêm ngặt. 'Flat 2.0', tức bề mặt phẳng cộng vài lớp bóng có chức năng được đưa trở lại (độ nâng của Material Design là phiên bản có hệ thống), là thỏa hiệp hiện đại phổ biến chứ không phải một mục riêng."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Flat Design.",
     "• mọi thứ chỉ là màu đặc, không có bóng",
     "• nút chỉ là hình chữ nhật màu",
     "• kiểu iOS 7 khi mọi thứ trở nên phẳng",
     "• biểu tượng là hình trắng đơn giản trên ô vuông màu",
     "• không gradient, không vân, chỉ khối màu sạch",
     "• phong cách thiết kế đã giết các nút bóng loáng"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• Solid 2D color fills (bề mặt và chất liệu): mọi bề mặt là một màu phẳng, không gradient, không độ bóng, không vân, không chất liệu nào cả.",
     "• No simulated depth (chiều sâu và ánh sáng): không bóng đổ, vát cạnh hay vệt sáng; các phần tử cùng nằm trên một mặt phẳng và cạnh chỉ được vẽ bằng sự đổi màu.",
     "• Simple glyph icons (hình ảnh và đồ trang trí): biểu tượng được rút gọn thành bóng hình học tối giản, một hình một màu đủ thể hiện cả vật.",
     "• Color carries the hierarchy (màu và độ tương phản): các màu khối tươi, thường bão hòa, phân biệt hành động và vùng; màu làm việc mà bóng từng làm."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng bề mặt theo flat design. Dấu hiệu định nghĩa: mọi bề mặt là một mảng màu đặc duy nhất, không gradient, độ bóng hay vân; không mô phỏng chiều sâu, tức không bóng đổ, vát cạnh hay vệt phản chiếu, cạnh chỉ được vẽ bằng sự đổi màu; biểu tượng là glyph hình học đơn giản một màu; thứ bậc do các khối màu, kích cỡ và kiểu chữ sans-serif sạch đảm nhiệm. Giữ bảng màu và mật độ linh hoạt, vì flat có thể thưa hoặc dày. Trong CSS, điều đó nghĩa là dùng background-color thay cho gradient trong background-image, border: none hoặc 1px solid, và box-shadow: none. Đừng trôi sang skeuomorphism: điểm quyết định là không có gì bắt chước chất liệu vật lý được chiếu sáng. Giữ tương phản chữ 4.5:1, và làm phần tử tương tác nhận ra được mà không cần bóng, nghĩa là có gợi ý màu rõ ràng, trạng thái hover/nhấn thấy được và vòng focus thấy được."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Flat Design và Skeuomorphism.",
     "Skeuomorphism: Đây là Flat Design vì bề mặt là mảng màu đặc không đổ bóng và biểu tượng là glyph trừu tượng, không gì bắt chước đồ vật hay chất liệu thật. Nó sẽ thành skeuomorphism nếu các mảng màu mọc thêm độ bóng, vân và ánh sáng cho tới khi control đọc như vật thật bạn có thể chạm vào.",
     "So với Minimalism: Đây là Flat Design vì nhận định ở đây nói về CÁCH VẼ: dù trên màn hình có bao nhiêu nội dung, tất cả đều được vẽ bằng màu 2D không đổ bóng. Nó sẽ là minimalism nếu nhận định nói về NỘI DUNG, tức ít phần tử và nhiều khoảng trống, điều mà một UI phẳng hoàn toàn có thể không đạt được (phẳng mà chật là chuyện thường)."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Bề mặt và chất liệu, cốt lõi: Solid 2D color fills. Mọi bề mặt là một màu phẳng, không gradient, không độ bóng, không vân, không chất liệu nào cả.",
     "• Chiều sâu và ánh sáng, cốt lõi: No simulated depth. Không bóng đổ, vát cạnh hay vệt sáng; các phần tử cùng một mặt phẳng và cạnh chỉ được vẽ bằng sự đổi màu.",
     "• Chiều sâu và ánh sáng, nên tránh: Gloss, gradients, textures. Một vệt phản chiếu hay vân da làm vỡ phong cách; đó là cánh cửa quay về skeuomorphism.",
     "• Hình ảnh và đồ trang trí, cốt lõi: Simple glyph icons. Biểu tượng được rút gọn thành bóng hình học tối giản; một hình một màu đủ thể hiện cả vật.",
     "• Màu và độ tương phản, cốt lõi: Color carries the hierarchy. Các màu khối tươi, thường bão hòa, phân biệt hành động và vùng; màu làm việc mà bóng từng làm.",
     "• Kiểu chữ, phụ trợ: Typography does the structure. Chữ sans-serif sạch với các bậc cỡ rõ ràng phân tách các cấp nội dung, thay chỗ cho khung và vát cạnh trước đây.",
     "• Bố cục và bố trí, biến thiên: Density is free. Flat chỉ chi phối CÁCH VẼ; một UI phẳng có thể là trang landing thưa hoặc dashboard dày."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• CSS cho nút phẳng: nền màu #2f80ed, không viền, bo góc 4px, tắt hẳn box-shadow. Một màu duy nhất, không ánh sáng ở bất cứ đâu.",
     "• CSS cho danh sách kiểm tra gỡ skeuomorphism: đặt filter, background-image và text-shadow về none, để không còn gì mô phỏng ánh sáng.",
     "• Tailwind: bg-sky-600 và text-white, kèm rounded, shadow-none; khi hover thì dùng hover:bg-sky-700. Trạng thái đổi bằng đổi màu chứ không bằng độ nâng."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• NN/g đã đo cái giá phải trả: UI phẳng có tín hiệu yếu khiến người dùng không chắc thứ gì bấm được; hãy cho nút và liên kết gợi ý màu không thể nhầm, đừng chỉ dựa vào vị trí gần nhau.",
     "• Khi bóng đã mất, màu phải gánh hai việc; kiểm tra tương phản 4.5:1 cho chữ VÀ 3:1 cho đường biên của control với nền.",
     "• Đừng bỏ outline focus chỉ để cho 'sạch'; UI phẳng không có vòng focus thì bàn phím không dùng được."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Nổi lên quanh năm 2012: ngôn ngữ Metro của Microsoft (Windows Phone 7 năm 2010, Windows 8 năm 2012) chứng minh nó ở quy mô hệ điều hành, và bản thiết kế lại iOS 7 của Apple năm 2013 kết thúc hẳn thời skeuomorphism. NN/g truy gốc sâu hơn về phong cách chữ Thụy Sĩ/Quốc tế.",
     "Nguồn: hai bài của Nielsen Norman Group, một về nguồn gốc và vấn đề của Flat Design, một về việc phần tử UI phẳng thu hút ít chú ý hơn và gây bối rối."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Skeuomorphism: Phong cách (Style)",
     "Minimalism: Phong cách (Style)",
     "Neobrutalism: Phong cách (Style)"
    ]
   }
  ],
  "card": {
   "label": "",
   "quote": "mọi thứ chỉ là màu đặc, không có bóng",
   "tags": [
    "mảng màu đặc 2D",
    "không mô phỏng chiều sâu",
    "biểu tượng glyph đơn giản"
   ]
  }
 },
 "styles/frutiger-aero": {
  "title": "Frutiger Aero",
  "lead": "Frutiger Aero là sự lạc quan bóng loáng thấm đẫm thiên nhiên của khoảng 2004 đến 2013: bầu trời và nước xanh tươi, cỏ xanh, bong bóng, cá, tia sáng hòa với tấm kính trong mờ, nút aqua và kiểu chữ humanist sạch sẽ. Công nghệ tự trình bày như thứ tươi mới, sinh thái và không ma sát, tức tương lai như một ngày nắng. Đó là thời của hình nền Windows Vista/7, trình phát media bóng loáng và các site sản phẩm Web 2.0.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: nhãn hồi tưởng.",
     "Nhãn hồi tưởng do Consumer Aesthetics Research Institute (CARI, khoảng 2017) đặt ra, ghép từ các kiểu chữ humanist của Adrian Frutiger và Windows Aero. Hồi 2007 không ai làm ra nó mà gọi bằng tên này.",
     "Còn được gọi là: Aero glass era look, hoặc eco-tech gloss, hoặc Web 2.0 gloss era.",
     "Minh họa: chọc một bong bóng. Bầu trời, cỏ, độ bóng; công nghệ như một ngày nắng."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "Windows Aero là ngôn ngữ thiết kế của riêng Microsoft cùng thời, vừa là thành phần vừa là cái tên gốc, nhưng không phải biệt danh chính xác. Diện mạo crôm và mạng máy tính tổng hợp đi TRƯỚC nó là Y2K, hàng xóm gần nhất của mục này."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Frutiger Aero.",
     "• bóng bóng loáng, cỏ xanh, cửa sổ cũ, tương lai",
     "• không khí hình nền trời xanh cỏ xanh với nút sáng bóng",
     "• giọt nước, cá và giao diện thủy tinh năm 2008",
     "• kiểu công nghệ thiên nhiên bóng sạch như windows cũ",
     "• bong bóng bay trên nền gradient xanh sáng"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• Nature fused with tech (hình ảnh và đồ trang trí): bầu trời, nước, cỏ, lá, cá và bong bóng là thế giới bao quanh mà UI nổi trong đó; sinh thái được dùng như lời hứa của công nghệ.",
     "• Glossy glass and aqua surfaces (bề mặt và chất liệu): tấm và nút trong mờ có vệt sáng cong mạnh, độ bóng ướt đầy ánh sáng chứ không phải lớp mờ đục.",
     "• Sky-blue / grass-green palette (màu và độ tương phản): xanh lơ phát sáng và xanh lá tươi cùng ánh sáng trắng, tươi, sạch, ấm sáng, không bao giờ đục.",
     "• Clean humanist sans type (kiểu chữ): sans-serif humanist bo tròn thân thiện (kiểu Frutiger/Segoe) màu trắng hoặc xanh trời đậm, hướng tới sự rõ ràng chứ không phải chất kỹ thuật."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng sản phẩm theo Frutiger Aero. Dấu hiệu định nghĩa: hình ảnh thiên nhiên hòa với công nghệ (trời xanh, nước, cỏ, bong bóng, tia sáng) làm phông nền bao quanh; bề mặt 'aqua' bóng trong mờ với vệt sáng cong; bảng màu xanh trời và xanh cỏ phát sáng, đầy ánh sáng trắng; chữ sans-serif humanist sạch (kiểu Frutiger/Segoe). Phụ trợ: vòng tròn bokeh, tia nắng, vệt sáng quét chéo. Giữ linh hoạt phần thiên nhiên cụ thể (dưới nước, đồng cỏ, giọt nước). Dùng các lớp gradient radial/linear chồng nhau cho bầu trời và mũ bóng, lớp phủ trắng rgba cho độ lóng lánh, và nhiều panel bo tròn rộng rãi. Đừng trôi sang Y2K; điểm quyết định là thiên nhiên, nếu crôm, chữ kỹ thuật hay lưới mạng thay chỗ bầu trời và cỏ thì bạn đã vượt qua ranh giới. Giữ tương phản chữ 4.5:1 trên nền ảnh (đặt chữ trên một panel), trạng thái focus thấy được, và hỗ trợ giảm chuyển động cho các hiệu ứng lóng lánh và bong bóng."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Frutiger Aero và Y2K Digital Aesthetic.",
     "Y2K Digital Aesthetic: Đây là Frutiger Aero vì độ bóng phục vụ sự lạc quan công nghệ-thiên nhiên, với trời, nước, cỏ và bong bóng phía sau chữ humanist sạch. Nó sẽ thành Y2K nếu thiên nhiên rút đi và bề mặt trở nên nhân tạo: crôm, nhựa gel, xanh bạc ánh cầu vồng và chữ techno bản rộng.",
     "So với Glassmorphism: Đây là Frutiger Aero vì kính bóng và trông ướt, được chiếu sáng như một ngày nắng, và không tách khỏi hình ảnh thiên nhiên. Nó sẽ thành glassmorphism nếu các panel dẹt thành hình chữ nhật mờ đục trên nền gradient trừu tượng và câu chuyện thiên nhiên biến mất.",
     "So với Skeuomorphism: Đây là Frutiger Aero vì độ bóng diễn đạt một tâm trạng (công nghệ sinh thái tươi mới), không phải bắt chước một vật cụ thể. Nó sẽ thành skeuomorphism nếu bề mặt bắt chước những chất liệu và đồ vật thật cụ thể như da, giấy, thiết bị vật lý cho sự quen thuộc."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Hình ảnh và đồ trang trí, cốt lõi: Nature fused with tech. Bầu trời, nước, cỏ, lá, cá và bong bóng là thế giới bao quanh mà UI nổi trong đó, sinh thái như lời hứa của công nghệ.",
     "• Hình ảnh và đồ trang trí, biến thiên: Which slice of nature. Cảnh dưới nước, đồng cỏ, giọt trên lá, cá vàng, tuabin gió; bất cứ thiên nhiên tươi và nhiều nắng nào cũng đọc ra phong cách này.",
     "• Bề mặt và chất liệu, cốt lõi: Glossy glass and aqua surfaces. Tấm và nút trong mờ có vệt sáng cong mạnh, độ bóng ướt đầy ánh sáng chứ không phải lớp mờ đục.",
     "• Bề mặt và chất liệu, nên tránh: Chrome and cyber styling. Crôm gương, chữ techno và lưới khung dây kéo không khí về lại chủ nghĩa tương lai Y2K nhân tạo.",
     "• Màu và độ tương phản, cốt lõi: Sky-blue / grass-green palette. Xanh lơ phát sáng và xanh lá tươi cùng ánh sáng trắng, tươi, sạch, ấm sáng, không bao giờ đục.",
     "• Kiểu chữ, cốt lõi: Clean humanist sans type. Sans-serif humanist bo tròn thân thiện (kiểu Frutiger/Segoe) màu trắng hoặc xanh trời đậm, hướng tới sự rõ ràng chứ không phải chất kỹ thuật.",
     "• Chiều sâu và ánh sáng, phụ trợ: Bokeh, rays, and sheen. Vòng sáng mềm, tia nắng xuyên nước và vệt sáng quét chéo cho mọi thứ vẻ lấp lánh như vừa được rửa sạch."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• CSS cho thế giới trời trên cỏ: linear-gradient dọc đi từ xanh trời nhạt #8fd3ff qua #3fa9f5 rồi sang xanh cỏ #8fd948 và #4a9e2e.",
     "• CSS cho mũ bóng aqua: gradient với lớp trắng .55 giảm dần về .06 rồi dừng cứng ở khoảng 50% để tách vệt sáng khỏi thân, cộng border-radius 999px.",
     "• CSS cho điểm sáng bong bóng/giọt nước: radial-gradient tâm lệch về 35% 30% với lõi trắng đậm mờ dần ra viền."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• Chữ trắng đặt thẳng lên ảnh trời/cỏ sẽ trượt tương phản ở vùng sáng; hãy đặt chữ lên panel trong mờ và đo đạt 4.5:1.",
     "• Vệt bóng cắt ngang nửa trên control có thể làm chìm nhãn; hãy giữ vùng nhãn dưới vệt sáng hoặc làm tối nền phía sau.",
     "• Bong bóng, tia nắng và vệt lóng lánh chỉ là không khí, không bao giờ là ý nghĩa, và phải dừng khi có prefers-reduced-motion."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Khoảng 2004 đến 2013 trong công nghệ tiêu dùng (thời Windows Vista/7, UI thiết bị bóng loáng, menu thời Wii, thương hiệu Web 2.0). Được đặt tên hồi tố quanh 2017 bởi các biên mục viên của CARI, theo kiểu chữ humanist của Adrian Frutiger cộng Windows Aero; làn sóng hoài niệm đưa nhãn này thành phổ biến trong thập niên 2020.",
     "Nguồn: trang Frutiger Aero của CARI, và bài của AIGA Eye on Design về thẩm mỹ Y2K (thời đại kế bên)."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Y2K Digital Aesthetic: Phong cách (Style)",
     "Windows Aero: Phong cách (Style)",
     "Glassmorphism: Phong cách (Style)",
     "Skeuomorphism: Phong cách (Style)",
     "Visual Effect Material (Vibrancy) (macos): Phần tử macOS"
    ]
   }
  ],
  "card": {
   "label": "Nhãn hồi tưởng",
   "quote": "bóng bóng loáng, cỏ xanh, cửa sổ cũ, tương lai",
   "tags": [
    "thiên nhiên hòa với công nghệ",
    "bề mặt kính và aqua bóng",
    "bảng màu xanh trời và xanh cỏ"
   ]
  }
 },
 "styles/glassmorphism": {
  "title": "Glassmorphism",
  "lead": "Glassmorphism dựng giao diện từ các tấm kính mờ trong suốt: nền phía sau, thường là thứ gì đó rực rỡ, nhòe xuyên qua mỗi bề mặt, một viền sáng mỏng bắt lấy 'mép' kính, và các lớp xếp chồng với bóng mềm để gợi chiều sâu. Phong cách này sống hay chết nhờ phông nền: trên nền trơn, kính chỉ là màu xám trơ; trên gradient nhiều màu, nó phát sáng.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: xu hướng do giới ngành đặt tên.",
     "Michal Malewicz đặt ra năm 2020 làm nhãn xu hướng cho một hiệu ứng kính mờ đã có từ lâu (Windows Vista Aero, độ nhòe của iOS 7, vibrancy trên macOS).",
     "Còn được gọi là: frosted glass UI, hoặc glass UI, hoặc frosted panels.",
     "Minh họa: kính mờ cần một hình nền rực rỡ, vì chính màu nền là bảng màu."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "Mục này nói về phong cách kính mờ chung chung dành cho nội dung. Chất liệu thích ứng toàn hệ thống của Apple là Liquid Glass (có mục riêng), còn hiệu ứng nhòe phía sau cửa sổ cũ của macOS là vibrancy, một thuật ngữ UI chứ không phải một phong cách."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Glassmorphism.",
     "• các thẻ mờ như kính đục đặt trên hình nền nhiều màu",
     "• hiệu ứng thẻ nhòe nhìn xuyên được",
     "• các panel làm nhòe mọi thứ phía sau",
     "• thẻ trong suốt đục như sữa với viền sáng mỏng",
     "• kiểu dashboard trong mờ có nền gradient"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• Frosted translucent panels (bề mặt và chất liệu): bề mặt bán trong suốt với độ nhòe nền mạnh, nội dung phía sau thấy được nhưng mềm đi như kính mờ.",
     "• Vivid backdrop showing through (màu và độ tương phản): một gradient, ảnh hay cực quang nhiều màu nằm sau kính; màu của nó thấm qua mọi panel và chiếm phần lớn bảng màu.",
     "• Thin light edge (hình học và viền): viền trắng bán trong suốt 1px (thường sáng hơn ở trên) bắt lấy mép từng panel, tách kính này với kính kia.",
     "• Layered floating depth (chiều sâu và ánh sáng): panel nổi trên nền và nổi lên nhau bằng bóng rộng và mềm; chồng các tấm là một phần của diện mạo."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng bề mặt theo glassmorphism. Dấu hiệu định nghĩa: panel bán trong suốt với độ nhòe nền mạnh; nền gradient rực rỡ hoặc nền ảnh có màu thấm qua mọi panel; viền trắng bán trong suốt 1px ở cạnh mỗi panel; chiều sâu nổi tầng với bóng rộng, mềm. Giữ linh hoạt màu và hình ảnh cụ thể của nền. Dùng CSS backdrop-filter với blur 16px, cùng nền rgba trắng alpha 0.12 (hoặc bản tối tương đương) và viền 1px trắng alpha 0.25. Đừng trôi sang Liquid Glass của Apple; điểm quyết định là glassmorphism là lớp da trang trí cho mọi bề mặt, kể cả thẻ nội dung, còn Liquid Glass dành kính riêng cho lớp control nổi phía trên nội dung. Giữ chữ đọc được trên mọi vùng mà nền có thể tạo ra (thêm lớp scrim tương phản nếu cần), control và trạng thái focus thấy được, cùng phương án thay thế khi giảm chuyển động hoặc giảm độ trong suốt."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Glassmorphism và Liquid Glass.",
     "Liquid Glass: Đây là glassmorphism vì lớp mờ là lớp da trang trí chung, nên thẻ nội dung, dashboard hay cả panel đều có thể là kính đặt trên hình nền bạn chọn. Nó sẽ thành Liquid Glass nếu kính chỉ dành cho lớp CONTROL, gồm thanh, nút, điều hướng nổi trên nội dung app, dùng chất liệu thích ứng của Apple vốn khúc xạ và đổi sắc theo thứ đang cuộn bên dưới.",
     "So với Neumorphism: Đây là glassmorphism vì panel trong suốt và phụ thuộc vào nền nhiều màu nhòe xuyên qua. Nó sẽ thành neumorphism nếu mọi panel trở nên đục và mờ mịn, mang đúng màu nền, với cặp bóng mềm gánh hết phần việc."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Bề mặt và chất liệu, cốt lõi: Frosted translucent panels. Bề mặt bán trong suốt với độ nhòe nền mạnh; nội dung phía sau thấy được nhưng mềm đi như kính mờ.",
     "• Bề mặt và chất liệu, nên tránh: Opaque or unblurred panels. Thẻ đặc (hoặc trong suốt mà không nhòe) mất cảm giác kính mờ; chỉ trong suốt thì mới là độ mờ thấp chứ chưa phải kính.",
     "• Màu và độ tương phản, cốt lõi: Vivid backdrop showing through. Gradient, ảnh hay cực quang nhiều màu nằm sau kính; màu của nó thấm qua mọi panel và chiếm phần lớn bảng màu.",
     "• Hình học và viền, cốt lõi: Thin light edge. Viền trắng bán trong suốt 1px (thường sáng hơn ở trên) bắt lấy mép từng panel, tách kính này với kính kia.",
     "• Chiều sâu và ánh sáng, cốt lõi: Layered floating depth. Các panel nổi trên nền và nổi lên nhau bằng bóng rộng và mềm; chồng các tấm là một phần của diện mạo.",
     "• Kiểu chữ, phụ trợ: Light ink on glass. Chữ và biểu tượng thường trắng hoặc gần trắng, với các bậc trong suốt nhẹ để phân thứ bậc.",
     "• Hình ảnh và đồ trang trí, biến thiên: What the backdrop is. Lưới gradient, cực quang, ảnh chụp hay mảng màu thương hiệu; miễn rực rỡ và mềm thì được, công thức kính vẫn giữ nguyên."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• CSS cho panel kính cốt lõi: nền trắng alpha .12, backdrop-filter blur 16px, viền 1px trắng alpha .25, border-radius 16px.",
     "• CSS dự phòng: dùng @supports not (backdrop-filter) để đặt nền tối gần như đục (rgba(30,30,40,.85)) khi trình duyệt không hỗ trợ blur.",
     "• SwiftUI: .background(.ultraThinMaterial). Material hệ thống xấp xỉ tấm kính mờ (xem thêm Liquid Glass)."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• Độ tương phản chữ trên kính không ổn định vì nền chuyển động và thay đổi; hãy đo ở vùng xấu nhất hoặc thêm một lớp scrim tương phản trong mờ phía sau chữ.",
     "• Tôn trọng prefers-reduced-transparency (và 'Reduce transparency' của hệ điều hành) bằng phương án gần như đục.",
     "• backdrop-filter tốn kém trên máy yếu; bố cục phải tồn tại được khi thiếu nó, đừng bao giờ giấu nội dung sau một lớp nhòe bị lỗi."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Hiệu ứng đã có hàng chục năm: kính Aero của Windows Vista (2006), các lớp nhòe của iOS 7 (2013), vibrancy của macOS. Nhưng nhãn phong cách bắt nguồn từ bài viết năm 2020 của Michal Malewicz, sau khi diện mạo này lan khắp Dribbble và các bản thiết kế lại thời Big Sur.",
     "Nguồn: bài về Glassmorphism của Nielsen Norman Group, và phần Materials trong Apple HIG."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Liquid Glass: Phong cách (Style)",
     "Windows Aero: Phong cách (Style)",
     "Claymorphism: Phong cách (Style)",
     "Neumorphism: Phong cách (Style)",
     "Frutiger Aero: Phong cách (Style)",
     "Visual Effect Material (Vibrancy) (macos): Phần tử macOS",
     "Scrim (Backdrop / Overlay): Phong cách (Style)"
    ]
   }
  ],
  "card": {
   "label": "Xu hướng do giới ngành đặt tên",
   "quote": "các thẻ mờ như kính đục đặt trên hình nền nhiều màu",
   "tags": [
    "tấm trong mờ như kính nhám",
    "nền rực rỡ lộ xuyên qua",
    "viền sáng mỏng"
   ]
  }
 },
 "styles/liquid-glass": {
  "title": "Liquid Glass",
  "lead": "Liquid Glass là chất liệu thích ứng của Apple cho control và điều hướng: toolbar, tab bar, nút và thanh trượt được vẽ như kính kiểu thấu kính, nổi trong lớp riêng phía trên nội dung app, khúc xạ những gì cuộn bên dưới và tự đổi sắc để dễ đọc trong cả bối cảnh sáng lẫn tối. Nó mang tính chức năng chứ không trang trí: Apple chỉ áp dụng cho lớp control và giữ chính nội dung ở dạng đục. Hình viên thuốc (capsule) và bán kính góc đồng tâm là một phần hình học của nó.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: ngôn ngữ thiết kế của nhà sản xuất.",
     "Tên do chính Apple đặt cho chất liệu thích ứng được đưa vào toàn bộ iOS 26 / macOS Tahoe (WWDC 2025). Đây là ngôn ngữ thiết kế do hãng định nghĩa, có tài liệu trong Technology Overviews và HIG của Apple.",
     "Còn được gọi là: Apple Liquid Glass, hoặc giao diện Apple mới, hoặc iOS 26 glass design.",
     "Minh họa: chỉ có control là kính, còn hình nền và nội dung thì không bao giờ."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "'SwiftUI style' không phải một phong cách, vì SwiftUI là framework UI của Apple. Các app dựng bằng nó hiện nay TRÔNG giống Liquid Glass; trước 2025 chúng mang vẻ Apple bản địa phẳng hơn, và diện mạo kẹo cộng kẻ sọc của Mac OS X thời đầu là Aqua. Nếu ai đó nói 'làm cho giống SwiftUI', thường họ muốn nói mục này."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Liquid Glass.",
     "• thiết kế mới của apple mà nút trông như giọt nước",
     "• kiểu giao diện swiftui",
     "• nút ios trông như kính thật, bẻ cong thứ phía sau",
     "• kiểu toolbar mới của apple, trong suốt và bồng bềnh",
     "• tab bar bằng kính nổi trên nội dung app"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• Glass = the control layer (bố cục và bố trí): chỉ control và điều hướng là kính; thanh, nút, thanh trượt nổi phía trên app, còn nội dung bên dưới vẫn đục và đủ tương phản.",
     "• Lensing, not just blur (chiều sâu và ánh sáng): chất liệu hành xử như thấu kính thật: bẻ và gom ánh sáng từ thứ bên dưới, kèm vệt sáng cạnh rực, phong phú hơn lớp mờ phẳng.",
     "• Adaptive self-tinting (màu và độ tương phản): kính liên tục đổi sắc theo nội dung cuộn dưới nó và tự chuyển giữa dạng sáng và tối để dễ đọc.",
     "• Capsule and concentric geometry (hình học và viền): control nghiêng về hình viên thuốc; các góc lồng nhau dùng chung một tâm (bán kính đồng tâm), nên hình kính nằm khít về mặt thị giác trong khung chứa của chúng."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng bề mặt theo tinh thần Liquid Glass của Apple. Dấu hiệu định nghĩa: kính chỉ dành cho lớp control nổi (toolbar, tab bar, nút) phía trên nội dung đục; chất liệu khúc xạ thứ bên dưới, tức nhòe cộng vệt sáng cạnh kiểu khúc xạ chứ không phải lớp mờ phẳng; control đổi sắc thích ứng để dễ đọc trên nội dung thay đổi; hình viên thuốc với bán kính góc đồng tâm. Không hạn chế nội dung nằm dưới. Trên nền tảng Apple hãy dùng API thật: SwiftUI .glassEffect(), glassEffect(.regular, in: .capsule), còn thanh chuẩn tự có hiệu ứng này; trên web thì xấp xỉ bằng backdrop-filter blur kèm saturate, các vệt sáng trong chồng lớp và bo tròn viên thuốc. Đừng trôi sang glassmorphism chung chung; điểm quyết định là nội dung không bao giờ thành kính, chỉ control nổi như kính phía trên nó. Giữ khả năng đọc trên mọi vùng nội dung (chất liệu thật tự thích ứng, bản xấp xỉ của bạn cũng phải vậy), trạng thái focus thấy được, và tôn trọng Reduce Transparency / Reduce Motion."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Liquid Glass và Glassmorphism.",
     "Glassmorphism: Đây là Liquid Glass vì kính là chất liệu hệ thống có chức năng, dành riêng cho control và điều hướng nổi phía trên nội dung đục, tự điều chỉnh sắc để dễ đọc. Nó sẽ thành glassmorphism nếu lớp mờ lan sang chính nội dung, tức thẻ trong mờ trên hình nền trang trí, và độ nhòe là lớp da chứ không phải lớp control."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Bố cục và bố trí, cốt lõi: Glass = the control layer. Chỉ control và điều hướng là kính; thanh, nút, thanh trượt nổi phía trên app, còn nội dung bên dưới vẫn đục và đủ tương phản.",
     "• Chiều sâu và ánh sáng, cốt lõi: Lensing, not just blur. Chất liệu hành xử như thấu kính thật: bẻ và gom ánh sáng từ thứ bên dưới, kèm vệt sáng cạnh rực, phong phú hơn lớp mờ phẳng.",
     "• Màu và độ tương phản, cốt lõi: Adaptive self-tinting. Kính liên tục đổi sắc theo nội dung cuộn dưới nó và tự chuyển giữa dạng sáng và tối để dễ đọc.",
     "• Hình học và viền, cốt lõi: Capsule and concentric geometry. Control nghiêng về hình viên thuốc; các góc lồng nhau dùng chung một tâm (bán kính đồng tâm), nên hình kính khít về mặt thị giác trong khung chứa.",
     "• Chuyển động, phụ trợ: Controls morph fluidly. Các phần tử kính hợp nhất, tách ra và đổi hình khi ngữ cảnh thay đổi: tab bar co lại khi cuộn, nút bung thành menu.",
     "• Hình ảnh và đồ trang trí, biến thiên: Underlying content. Bất cứ gì cũng có thể nằm dưới kính (ảnh, bản đồ, danh sách); chất liệu thích ứng theo chúng chứ không đòi một phông nền được chọn sẵn.",
     "• Bề mặt và chất liệu, nên tránh: Glass content cards. Làm chính nội dung trong mờ, tức thẻ kính trên nền kính, chính là điều hướng dẫn của Apple tránh; đó là glassmorphism chung chung và làm mất khả năng đọc."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• SwiftUI: .glassEffect(.regular, in: .capsule). Chất liệu thật; toolbar và tab bar chuẩn tự áp dụng.",
     "• SwiftUI: GlassEffectContainer { … } cho phép các control kính kề nhau hợp nhất và đổi hình cùng nhau.",
     "• CSS xấp xỉ trên web: backdrop-filter blur 14px kèm saturate 1.6, nền trắng alpha .08, hai box-shadow inset sáng ở cạnh trên và dưới, border-radius 999px. Dáng viên thuốc na ná thấu kính nhưng không có khúc xạ thật."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• Chất liệu của Apple tự điều chỉnh để dễ đọc, còn bản web tự chế thì không; hãy thử chữ trên nội dung xấu nhất có thể cuộn xuống dưới và thêm xử lý tương phản.",
     "• Tôn trọng Reduce Transparency (phương án gần như đục) và Reduce Motion (tắt hiệu ứng đổi hình).",
     "• Đừng đặt chữ quan trọng thẳng lên kính giả khi chưa đo được 4.5:1 so với nền xấu nhất lúc chạy thật."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Apple giới thiệu tại WWDC 2025 như ngôn ngữ thiết kế thống nhất đầu tiên trên iPhone, iPad, Mac, Watch và TV. Apple nêu quang học kính của visionOS là nguồn cảm hứng, và phát hành nó như chất liệu hệ thống kèm API SwiftUI/UIKit/AppKit chứ không phải một chủ đề hình thức đơn thuần.",
     "Nguồn: trang Liquid Glass trong Technology Overviews của Apple, phần Materials trong Apple HIG, và trang SwiftUI của Apple (framework mà người ta gọi là 'diện mạo SwiftUI')."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Glassmorphism: Phong cách (Style)",
     "Aqua: Phong cách (Style)",
     "Visual Effect Material (Vibrancy) (macos): Phần tử macOS",
     "Toolbar (Unified Title Bar) (macos): Phần tử macOS",
     "Sheet (macos): Phần tử macOS"
    ]
   }
  ],
  "card": {
   "label": "Ngôn ngữ thiết kế của nhà sản xuất",
   "quote": "thiết kế mới của apple mà nút trông như giọt nước",
   "tags": [
    "kính là lớp điều khiển",
    "hiệu ứng thấu kính chứ không chỉ làm mờ",
    "tự đổi sắc theo nền"
   ]
  }
 },
 "styles/minimalism": {
  "title": "Minimalism",
  "lead": "Minimalism quyết định thứ gì CÓ MẶT trên màn hình, chứ không phải cách vẽ nó: lột giao diện xuống số phần tử ít nhất mà vẫn làm được việc, rồi để khoảng trống rộng rãi và một hai điểm nhấn chữ gây ấn tượng gánh bố cục. Nghiên cứu của NN/g trên 112 site tối giản tìm ra các đặc điểm lặp lại: bề mặt gần như phẳng, bảng màu hạn chế hoặc đơn sắc, số phần tử bị giới hạn, khoảng trống, và chữ lớn làm nhân vật chính.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: phong trào đã được thiết lập.",
     "Mượn từ phong trào nghệ thuật và kiến trúc giữa thế kỷ 20; nghiên cứu 112 website của NN/g đã chốt lại từ này mang nghĩa gì riêng trên web.",
     "Còn được gọi là: minimalist design, hoặc minimal web design.",
     "Minh họa: phần lớn trang này để trống có chủ ý, vì khoảng không chính là thiết kế."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "Minimalism và Flat Design nằm trên hai trục khác nhau: flat chi phối cách vẽ, còn minimalism chi phối nội dung, tính năng và bố cục. Một UI có thể phẳng nhưng chật, hoặc tối giản mà vẫn dùng chiều sâu và bóng."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Minimalism.",
     "• trang gần như không có gì",
     "• khoảng trống khổng lồ và một nút",
     "• tiêu đề khổng lồ và rất nhiều khoảng trắng",
     "• trang kiểu apple chỉ có một sản phẩm và không gì khác",
     "• website về cơ bản chỉ là chữ và không khí",
     "• bỏ hết thứ không cần thiết tới khi chỉ còn thông điệp"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• Negative space as material (bố cục và bố trí): khoảng trống mang tính chủ ý và rộng rãi; nội dung lơ lửng trong không khí, và không gian quanh một vật là thứ khiến nó có ý nghĩa.",
     "• Restricted element count (bố cục và bố trí): trên màn hình có ít thứ và mỗi thứ phải xứng đáng chỗ đứng: một điều hướng, một thông điệp, một hành động; trang trí bị xóa đi chứ không được tạo kiểu lại.",
     "• Limited or monochrome palette (màu và độ tương phản): tối đa một hai tông màu, thường chỉ đen/trắng/xám với một màu nhấn; tiết chế màu là một phần của sự tiết chế.",
     "• Dramatic typography (kiểu chữ): khi hình ảnh và đồ trang trí đã mất, chữ phải lớn lên: tiêu đề cỡ khổng lồ thường là thành phần ồn ào nhất của trang."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng bề mặt theo minimalism. Dấu hiệu định nghĩa: số phần tử ít nhất mà vẫn làm được việc, tức một điều hướng, một thông điệp, một hành động chính, trang trí bị xóa; khoảng trống rộng rãi quanh mọi thứ (hãy nghĩ tới 40 đến 60 phần trăm khung nhìn để trống); bảng màu hạn chế, gần như đơn sắc với tối đa một màu nhấn; một điểm nhấn chữ gây ấn tượng, tiêu đề cỡ lớn là thứ ồn ào nhất trên màn hình. Cách vẽ linh hoạt, mảng phẳng hay bóng tinh tế đều hợp. Đừng nhầm với flat design: minimalism ràng buộc nội dung và bố cục chứ không ràng buộc cách vẽ, nên nếu bạn thêm nội dung trở lại cho tới khi trang rối thì nó hết là tối giản dù phẳng cỡ nào. Giữ khả năng khám phá: hành động cốt lõi phải thấy được, không giấu sau các biểu tượng bí ẩn chỉ để trang trống, và chữ giữ tương phản 4.5:1 ngay cả trong bảng màu xám trên trắng."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Minimalism và Flat Design.",
     "Flat Design: Đây là minimalism vì chính nội dung đã được rút gọn, ít phần tử, khoảng trống mênh mông, một tiêu đề gây ấn tượng, bất kể cách vẽ. Nó chỉ đơn thuần là Flat Design nếu màn hình lại đầy nội dung và chỉ còn lại cách vẽ 2D không đổ bóng.",
     "So với Web Brutalism: Đây là minimalism vì sự thưa thớt được trau chuốt và có chỉ đạo nghệ thuật, một bố cục được cân nhắc của chữ, khoảng trống và một hành động. Nó sẽ thành web brutalism nếu bỏ phần trau chuốt và để trang lộ ra mặc định thô, như Times New Roman, link xanh, cấu trúc trần, coi đó là tuyên ngôn."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Bố cục và bố trí, cốt lõi: Negative space as material. Khoảng trống mang tính chủ ý và rộng rãi; nội dung lơ lửng trong không khí, và không gian quanh một vật là thứ khiến nó có ý nghĩa.",
     "• Bố cục và bố trí, cốt lõi: Restricted element count. Trên màn hình có ít thứ và mỗi thứ xứng đáng chỗ đứng: một điều hướng, một thông điệp, một hành động; trang trí bị xóa chứ không được tạo kiểu lại.",
     "• Bố cục và bố trí, nên tránh: Crowding and ornament. Một thông điệp thứ hai tranh chỗ, trang trí hoa mỹ hay một bức tường widget dày đặc đều phá phong cách dù trông phẳng thế nào.",
     "• Màu và độ tương phản, cốt lõi: Limited or monochrome palette. Tối đa một hai tông, thường chỉ đen/trắng/xám với một màu nhấn; tiết chế màu là một phần của sự tiết chế.",
     "• Kiểu chữ, cốt lõi: Dramatic typography. Khi hình ảnh và đồ trang trí đã mất, chữ phải lớn lên: tiêu đề cỡ khổng lồ thường là thành phần ồn ào nhất trang.",
     "• Chiều sâu và ánh sáng, biến thiên: Rendering is free. Phần lớn site tối giản vẽ phẳng, nhưng bóng và chiều sâu vẫn được phép; minimalism ràng buộc thứ GÌ được hiện, không ràng buộc nó được chiếu sáng THẾ NÀO."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• CSS cho cột chữ hẹp lơ lửng giữa khoảng trống có chủ ý: bề rộng tối đa 34rem (max-width), căn giữa bằng margin-inline: auto, và đệm trên dưới co giãn bằng clamp(4rem, 18vh, 10rem) ở padding-block.",
     "• CSS cho tiêu đề làm nhân vật chính của bố cục: font-size co giãn bằng clamp từ 2.5rem tới 6rem theo 8vw, khoảng cách chữ -0.03em (letter-spacing) và chiều cao dòng 1.05 (line-height)."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• Xám nhạt trên nền trắng là lỗi tương phản kinh điển của minimalism; hãy đo chữ ở 4.5:1, kể cả trong bảng màu dịu.",
     "• Đừng dọn sạch cả những gợi ý thao tác cùng với đồ trang trí: giấu điều hướng hay nhãn chỉ để giữ trang trống là đổi sự bừa bộn lấy sự bí ẩn.",
     "• Chữ hiển thị cỡ lớn cần clamp co giãn: tiêu đề 96px vừa trên desktop có thể gãy dòng thành bức tường khó đọc trên điện thoại."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Tinh thần giản lược của các phong trào giữa thế kỷ (Bauhaus, typography Thụy Sĩ, 'ít hơn là nhiều hơn') được đem vào giao diện; trên web nó thành giọng điệu thương hiệu 'nghiêm túc' thống trị suốt thập niên 2010, với các trang sản phẩm của Apple là mẫu được chép nhiều nhất. Nghiên cứu định nghĩa của NN/g ra đời năm 2015.",
     "Nguồn: hai bài của Nielsen Norman Group, một về đặc điểm của minimalism trong thiết kế web, một về Flat Design (trục về cách vẽ, được giữ tách biệt)."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Flat Design: Phong cách (Style)",
     "Web Brutalism: Phong cách (Style)"
    ]
   }
  ],
  "card": {
   "label": "",
   "quote": "trang gần như không có gì",
   "tags": [
    "khoảng trống được dùng như vật liệu",
    "số phần tử bị hạn chế",
    "bảng màu hạn chế hoặc đơn sắc"
   ]
  }
 },
 "styles/neobrutalism": {
  "title": "Neobrutalism",
  "lead": "Neobrutalism là một ngôn ngữ đồ họa được thiết kế: các khối màu phẳng bão hòa viền bằng nét đen dày, với bóng lệch cứng (hình chữ nhật đen đặc dịch đi vài pixel, không nhòe) và chữ hiển thị mập mạp. Phần tử đọc như nhãn dán hay bản in risograph; nhấn nút thường làm nó 'ép' vật lý vào bóng của nó. Dù tên là vậy, nó trái ngược với thô: mỗi đường viền và bóng đều là lựa chọn minh họa có chủ ý.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: xu hướng do giới ngành đặt tên.",
     "Nhãn đầu thập niên 2020 do giới ngành đặt ra (còn viết là neo-brutalism / neubrutalism); bị tranh cãi vì mượn tên brutalism cho một diện mạo được tạo kiểu rất kỹ chứ không hề thô.",
     "Còn được gọi là: neo-brutalism, hoặc neubrutalism, hoặc neo brutalist UI.",
     "Minh họa: bấm nút xanh lá, nó lún VÀO bóng đặc của chính nó."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "Nó lấy tên của brutalism nhưng không lấy phương pháp: xem Web Brutalism cho người anh em thật sự thô, và Brutalism kiến trúc (bê tông trần) nơi từ này khởi nguồn. Hoa văn confetti hình học kiểu Memphis thường tô điểm các trang neobrutalist nhưng là một phong trào riêng."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Neobrutalism.",
     "• khối màu sáng có viền đen và bóng cứng",
     "• nút có viền đen dày và bóng đặc không nhòe",
     "• kiểu website vàng đen trông như nhãn dán",
     "• giao diện hoạt hình mập mạp với viền đậm",
     "• phong cách phẳng đậm kiểu gumroad"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• Thick black outlines (hình học và viền): mọi phần tử, từ thẻ, nút, ô nhập tới cả ảnh, đều mang viền đen đặc đồng nhất dày 2 đến 3px, như khung truyện tranh vẽ mực.",
     "• Hard offset shadows (chiều sâu và ánh sáng): bóng là hình đen đặc dịch xuống phải với độ nhòe bằng KHÔNG, chiều sâu mang tính đồ họa chứ không phải chiếu sáng mô phỏng; khi nhấn, độ lệch này sụp lại.",
     "• Saturated flat color blocks (màu và độ tương phản): các mảng màu không ngại ngần như vàng, hồng đậm, xanh chanh, xanh lơ xếp phẳng cạnh nhau trên nền kem hoặc trắng, không gradient.",
     "• Chunky display type (kiểu chữ): grotesk hoặc font hiển thị đậm, vuông vức, thường cỡ lớn; chữ nội dung để trơn để tiêu đề có thể 'hét lên'."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng bề mặt theo Neobrutalism. Dấu hiệu định nghĩa: viền đen đặc đồng nhất 2 đến 3px trên mọi phần tử; bóng lệch cứng, đen đặc, dịch khoảng 4px xuống phải, độ nhòe bằng 0 (dạng box-shadow với hai độ lệch 4px, bán kính nhòe 0 và màu đen); mảng màu phẳng bão hòa (ví dụ vàng, hồng đậm, xanh chanh) trên nền kem hoặc trắng, không gradient; chữ hiển thị đậm, mập cho tiêu đề. Giữ linh hoạt bảng màu cụ thể và các món trang trí kiểu nhãn dán. Trạng thái active dịch phần tử vào đúng chỗ bóng của nó (transform translate 4px,4px và bỏ bóng). Đừng trôi sang Web Brutalism; điểm quyết định là diện mạo này được tạo kiểu rất kỹ, còn bỏ viền, bóng và màu để chuyển sang mặc định trình duyệt mới là brutalist đúng nghĩa. Giữ tương phản chữ 4.5:1 trên mọi khối màu (chữ đen trên nền bão hòa thường đạt; chữ trắng trên vàng thì không bao giờ), chỉ báo focus thấy được và khác với các viền trang trí, cùng hỗ trợ giảm chuyển động cho hiệu ứng ấn."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Neobrutalism và Web Brutalism.",
     "Web Brutalism: Đây là Neobrutalism vì sự thô ráp chỉ là bộ trang phục được thiết kế: viền dày đồng nhất, bóng lệch cứng và khối bão hòa là các lựa chọn đồ họa có chủ ý. Nó sẽ thành Web Brutalism nếu phần tạo kiểu bị gỡ bỏ thay vì phóng đại: chữ mặc định của trình duyệt, link xanh trơn, cấu trúc trần và hoàn toàn không có hiệu ứng trang trí.",
     "So với Neumorphism: Đây là Neobrutalism vì cạnh là mực đen tương phản tối đa và bóng là hình đồ họa cứng. Nó sẽ thành neumorphism nếu viền biến mất và chiều sâu chuyển sang mềm, control đúc từ một bề mặt mờ với cặp bóng đôi nhòe."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Hình học và viền, cốt lõi: Thick black outlines. Mọi phần tử, từ thẻ, nút, ô nhập đến cả ảnh, đều mang viền đen đặc đồng nhất dày 2 đến 3px, như khung truyện tranh vẽ mực.",
     "• Chiều sâu và ánh sáng, cốt lõi: Hard offset shadows. Bóng là hình đen đặc dịch xuống phải với độ nhòe bằng KHÔNG, chiều sâu mang tính đồ họa chứ không phải chiếu sáng mô phỏng; nhấn xuống làm độ lệch sụp lại.",
     "• Chiều sâu và ánh sáng, nên tránh: Soft rendering. Bóng nhòe, gradient hay trong suốt làm tan hiệu ứng in mực ngay lập tức; sự mềm là kẻ thù.",
     "• Màu và độ tương phản, cốt lõi: Saturated flat color blocks. Các mảng màu không ngại ngần như vàng, hồng đậm, xanh chanh, xanh lơ xếp phẳng cạnh nhau trên nền kem hoặc trắng, không gradient.",
     "• Màu và độ tương phản, biến thiên: Which loud palette. Vàng-đen là mẫu sáo mòn nhưng bộ màu bão hòa cao nào cũng được; viền và bóng mới gánh phong cách, không phải một sắc cụ thể.",
     "• Kiểu chữ, cốt lõi: Chunky display type. Grotesk hoặc font hiển thị đậm, vuông vức, thường cỡ lớn; chữ nội dung để trơn để tiêu đề có thể 'hét lên'.",
     "• Hình ảnh và đồ trang trí, phụ trợ: Sticker shapes and doodles. Ngôi sao, huy hiệu bầu bĩnh, mũi tên và nét nguệch ngoạc cùng viền đen, rải như nhãn dán.",
     "• Chuyển động, phụ trợ: Push-into-shadow presses. Trạng thái hover/active dịch phần tử về phía bóng của nó, như ép phẳng một nhãn dán thật."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• CSS cho cấu trúc thẻ/nút đặc trưng: viền 2px đen đặc, bóng lệch 4px 4px không nhòe màu đen, border-radius 8px.",
     "• CSS cho tương tác ép vào bóng: ở :active, dịch phần tử đi 4px sang phải và xuống, đồng thời bỏ bóng.",
     "• Tailwind cho cùng cấu trúc bằng các tiện ích: border-2 border-black, giá trị bóng tùy ý cho độ lệch 4px không nhòe, và ở active thì dịch x, y một đơn vị cùng shadow-none."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• Các mảng bão hòa cần được kiểm tra tương phản chữ: mực đen trên vàng/xanh chanh đạt dễ dàng, còn mực trắng trên vàng, hồng hay xanh lơ thường trượt 4.5:1.",
     "• Viền đen trang trí trông giống vòng focus; hãy cho focus bàn phím một chỉ báo riêng, dễ thấy hơn (ví dụ viền offset bằng một màu dành riêng).",
     "• Lời cảnh báo của NN/g: độ ồn ào làm tốn khả năng đọc khi đọc lâu; giữ chữ nội dung trơn và dành sự hét lên cho cấu trúc và hành động."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Xuất hiện quanh 2020 đến 2022 trên các trang tiếp thị sản phẩm và portfolio (bản thiết kế lại năm 2021 của Gumroad là gương mặt tiêu biểu của thời kỳ), được NN/g lập danh mục năm 2023 như một phản ứng với thiết kế SaaS mềm mại, giống hệt nhau, tức flat design bật hết cỡ với cấu trúc truyện tranh.",
     "Nguồn: bài về Neobrutalism của Nielsen Norman Group, và bài về phát triển web brutalist của Smashing Magazine (trường hợp đối chiếu)."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Web Brutalism: Phong cách (Style)",
     "Neumorphism: Phong cách (Style)",
     "Flat Design: Phong cách (Style)",
     "Claymorphism: Phong cách (Style)",
     "Badge vs. Chip vs. Pill vs. Tag: Phong cách (Style)"
    ]
   }
  ],
  "card": {
   "label": "Xu hướng do giới ngành đặt tên",
   "quote": "khối màu sáng có viền đen và bóng cứng",
   "tags": [
    "viền đen dày",
    "bóng đổ lệch cứng",
    "khối màu phẳng bão hòa"
   ]
  }
 },
 "styles/neumorphism": {
  "title": "Neumorphism",
  "lead": "Neumorphism vẽ mọi control như thể được đùn ra từ, hoặc ép lõm vào, chính trang: nền và control dùng chung một màu mờ, hình dạng hoàn toàn đến từ một cặp bóng mềm, ánh sáng từ trên trái và tối dần về dưới phải. Không có gì có viền và không có gì nổi lên; cả giao diện đọc như một bề mặt đúc liền khối. Nó chụp lên ảnh thì rất đẹp mà thử nghiệm thì kém: chính sự mềm mại làm nó đặc biệt lại xóa mất độ tương phản mà control thật cần.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: xu hướng do giới ngành đặt tên.",
     "Được đặt tên cuối 2019 (từ ghép trong một bình luận, nghĩa là 'new skeuomorphism'), phổ biến nhờ các bài viết của Michal Malewicz và những ảnh Dribbble của Alexander Plyuto. Đây là nhãn xu hướng, không phải thuật ngữ học thuật.",
     "Còn được gọi là: Soft UI, hoặc neomorphism, hoặc soft neumorphic UI.",
     "Minh họa: bấm play, trạng thái đang phát là bị ép LÚN vào chính bề mặt chung."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "Mục này nói về diện mạo xu hướng 'Soft UI' giai đoạn 2019 đến 2021. Người anh em đất sét 3D của nó, phồng dày hơn như đồ chơi, thường gọi là claymorphism và là một mục riêng (sẽ có sau)."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Neumorphism.",
     "• các nút mềm như bị đẩy nhô ra khỏi nền",
     "• mọi thứ trông như đúc từ cùng một bề mặt giống đất sét",
     "• nút gối nổi dập với hai cái bóng",
     "• control trông như đóng dấu vào trang",
     "• dashboard xám mềm mà nút không có viền"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• One continuous surface (bề mặt và chất liệu): control và nền dùng CÙNG một màu mờ; phần tử không được đặt lên trang mà được đúc từ chính nó.",
     "• Dual soft shadows (chiều sâu và ánh sáng): mỗi phần tử nổi mang hai bóng nhòe: một bóng sáng ở trên trái và một bóng tối ở dưới phải, như được chiếu từ một đèn góc dịu.",
     "• Pressed (inset) states (chiều sâu và ánh sáng): ô nhập và trạng thái active đảo cặp bóng vào trong, nên phần tử trông như bị ép LÚN vào bề mặt thay vì nhô lên.",
     "• No borders, whisper contrast (hình học và viền): cạnh chỉ tồn tại ở chỗ bóng nhạt dần; không viền, không màu đặc mạnh; cả UI nằm trong một dải hẹp của một sắc."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng bề mặt theo neumorphism (Soft UI). Dấu hiệu định nghĩa: control dùng đúng màu mờ của nền; phần tử nổi có cặp bóng mềm (sáng trên trái, tối dưới phải); trạng thái nhấn/ô nhập đảo bóng vào trong (inset); không viền ở bất cứ đâu; góc bo rộng rãi. Giữ linh hoạt sắc nền (kinh điển là xám xanh nhạt như #e0e5ec) và cho phép một màu nhấn bão hòa cho hành động chính. Dùng cặp box-shadow trong CSS, ví dụ phần nổi gồm một bóng trắng alpha .85 lệch -6px -6px nhòe 12px và một bóng xám xanh lệch 6px 6px nhòe 12px; phần nhấn dùng đúng cặp đó nhưng thêm inset. Đừng trôi sang skeuomorphism; điểm quyết định là bề mặt neumorphic là một lớp mờ đồng nhất không có chất liệu, tức không vân, không độ bóng, không bắt chước chất liệu. Giữ độ tương phản chữ đọc được, một dấu hiệu không dựa vào bóng cho focus và trạng thái (tương phản phi văn bản theo WCAG sẽ trượt nếu chỉ có bóng), và hỗ trợ giảm chuyển động."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Neumorphism và Skeuomorphism.",
     "Skeuomorphism: Đây là neumorphism vì control và nền là một bề mặt mờ không chất liệu, chỉ được tạo hình bằng cặp bóng mềm. Nó sẽ thành skeuomorphism nếu bề mặt bắt đầu bắt chước các chất liệu thật gọi tên được như vân da, nhựa bóng, kim loại chải, kèm họa tiết và ẩn dụ đồ vật.",
     "So với Glassmorphism: Đây là neumorphism vì mọi phần tử đều đục và mang đúng màu nền, chiều sâu đến từ bóng chứ không từ độ trong suốt. Nó sẽ thành glassmorphism nếu panel trở nên trong mờ như kính nhám, để nền nhiều màu nhòe xuyên qua phía sau."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Bề mặt và chất liệu, cốt lõi: One continuous surface. Control và nền dùng CÙNG một màu mờ; phần tử không được đặt lên trang mà được đúc từ chính nó.",
     "• Chiều sâu và ánh sáng, cốt lõi: Dual soft shadows. Mỗi phần tử nổi mang hai bóng nhòe, một sáng ở trên trái và một tối ở dưới phải, như được chiếu từ một đèn góc dịu.",
     "• Chiều sâu và ánh sáng, cốt lõi: Pressed (inset) states. Ô nhập và trạng thái active đảo cặp bóng vào trong, nên phần tử trông bị ép LÚN vào bề mặt thay vì nhô lên.",
     "• Hình học và viền, cốt lõi: No borders, whisper contrast. Cạnh chỉ tồn tại ở chỗ bóng nhạt dần; không viền, không màu đặc mạnh; cả UI nằm trong một dải hẹp của một sắc.",
     "• Hình học và viền, phụ trợ: Generous rounded corners. Bán kính lớn và mềm ở mọi nơi; góc sắc sẽ phá ảo giác đúc khối.",
     "• Màu và độ tương phản, biến thiên: Any single base hue. Kinh điển là xám xanh nhạt (#e0e5ec), nhưng hiệu ứng chạy trên mọi nền sáng, độ bão hòa thấp; một màu nhấn bão hòa có thể được giữ cho hành động chính.",
     "• Hình ảnh và đồ trang trí, nên tránh: Textures and materials. Da, giấy hay độ bóng sẽ kéo skeuomorphism trở lại; bề mặt neumorphic phải mờ, đồng nhất và không chất liệu."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• CSS cho phần tử nổi trên nền kinh điển: nền #e0e5ec, hai bóng gồm bóng trắng alpha .85 lệch -6px và bóng xám xanh alpha .6 lệch 6px, mỗi bóng nhòe 12px, border-radius 16px.",
     "• CSS cho trạng thái nhấn / ô nhập lõm: cặp bóng inset gồm bóng trắng alpha .75 lệch -4px và bóng xám xanh alpha .55 lệch 4px, mỗi bóng nhòe 8px."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• Dấu ấn của phong cách CHÍNH LÀ vấn đề WCAG: ranh giới chỉ bằng bóng hiếm khi đạt mức tối thiểu 3:1 cho tương phản phi văn bản; hãy thêm vòng focus thật và ít nhất một dấu hiệu trạng thái không dựa vào bóng (màu, biểu tượng, nhãn).",
     "• Trong neumorphism thuần, trạng thái disabled, enabled và pressed trông na ná nhau; người kém thị lực có thể không tìm ra control. NN/g và chính các tác giả đặt tên cũng cảnh báo đừng phát hành nó cho UI chức năng.",
     "• Nếu vẫn giữ, hãy dành nó cho các khung trang trí lớn và cho phần tử tương tác độ tương phản mạnh hơn mức phong cách này muốn."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Một xu hướng của thời Dribbble: các ảnh 'Skeuomorph Mobile Banking' năm 2019 của Alexander Plyuto lan truyền mạnh, bình luận của Jason Kelley đặt ra cái tên, và các bài 2019 đến 2020 của Michal Malewicz vừa định nghĩa vừa cảnh báo về nó. Nó hầu như chỉ ở dạng ảnh concept, ít sản phẩm phát hành nào chịu nổi cái giá về khả năng tiếp cận.",
     "Nguồn: bài của Michal Malewicz về neumorphism trong giao diện người dùng, và bài Skeuomorphism 101 của Nielsen Norman Group (dòng dõi)."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Skeuomorphism: Phong cách (Style)",
     "Claymorphism: Phong cách (Style)",
     "Glassmorphism: Phong cách (Style)",
     "Neobrutalism: Phong cách (Style)"
    ]
   }
  ],
  "card": {
   "label": "Xu hướng do giới ngành đặt tên",
   "quote": "các nút mềm như bị đẩy nhô ra khỏi nền",
   "tags": [
    "một bề mặt liền mạch",
    "cặp bóng mềm đôi",
    "trạng thái nhấn lõm vào"
   ]
  }
 },
 "styles/skeuomorphism": {
  "title": "Skeuomorphism",
  "lead": "Skeuomorphism mang chất liệu và đồ vật đời thực vào giao diện số: control được vẽ như thể làm bằng một thứ vật lý nào đó, như nhựa bóng, kim loại chải, da, giấy, với ánh sáng, vân và gợi ý thao tác của vật thật. Một app skeuomorphic tự dạy cách dùng: trang trông như xé được thì mời gọi lật, nút bóng nhô lên thì mời gọi bấm. Nó lên đỉnh ở iOS và Mac OS X thời đầu, và phần lớn bị flat design thay thế vào khoảng 2013.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: phong trào đã được thiết lập.",
     "Mượn từ khảo cổ học (skeuomorph là một vật phái sinh còn giữ dấu vết trang trí của chất liệu gốc); là từ vựng HCI chuẩn kể từ ẩn dụ màn hình nền thập niên 1980.",
     "Còn được gọi là: skeuomorphic design, hoặc realistic UI, hoặc real-world metaphor UI.",
     "Minh họa: da, đường khâu, giấy kẻ dòng; app được vẽ như chính đồ vật."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "Mục này nói về phong cách thị giác. Nghĩa ẩn dụ tương tác (một 'thùng rác' bạn kéo tệp vào) là cùng ý tưởng ở tầng cao hơn, và NN/g xử lý cả hai chung; nhưng các dấu hiệu của atlas bên dưới nói về điểm ảnh chứ không phải ẩn dụ."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Skeuomorphism.",
     "• app trông như cuốn sổ da thật",
     "• nút trông như nút vật lý bóng loáng bạn có thể ấn",
     "• app iphone cũ có đường khâu và vân giấy",
     "• cái máy tính trông như máy tính thật",
     "• vân thật như gỗ và kim loại trong giao diện"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• Simulated real materials (bề mặt và chất liệu): bề mặt trông như làm từ vật lý nào đó, như da, giấy, vải lanh, kim loại chải, nỉ xanh, thường kèm vân hoặc thớ nhìn thấy được.",
     "• Physical lighting model (chiều sâu và ánh sáng): vệt sáng bóng, vát cạnh và bóng trong gợi ra nguồn sáng: nút phồng ra, ô nhập lõm vào, cạnh bắt sáng.",
     "• Real-object metaphors (hình ảnh và đồ trang trí): UI được vẽ CHÍNH LÀ đồ vật mà nó thay thế: sổ ghi chú giấy kẻ dòng, giá sách đầy bìa, núm xoay.",
     "• Crafted physical details (hình học và viền): đường khâu, mép giấy rách, chữ dập nổi hoặc in ép, đinh tán; những dấu vết trang trí về cách vật 'thật' được chế tạo."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng bề mặt theo skeuomorphism. Dấu hiệu định nghĩa: control được vẽ như chất liệu vật lý mô phỏng (ví dụ da, giấy, kim loại chải) với vân nhìn thấy được; một mô hình ánh sáng nhất quán, vệt bóng trên phần tử nổi, bóng trong trên ô lõm; ẩn dụ đồ vật thật cho cả bề mặt (một sổ ghi chú vẽ thành giấy kẻ dòng); chi tiết thủ công vật lý như đường khâu hoặc chữ dập nổi. Giữ linh hoạt bảng chất liệu và mật độ cụ thể. Dùng gradient nhiều lớp có vệt sáng phản chiếu, box-shadow inset cho ô lõm, và ảnh vân hoặc nhiễu tinh tế. Đừng trôi sang neumorphism: điểm quyết định là bề mặt skeuomorphic bắt chước chất liệu thật gọi tên được, không phải một bề mặt mềm đồng nhất đùn lên. Giữ độ tương phản chữ đọc được trên nền có vân, control và trạng thái focus thấy được, và hỗ trợ giảm chuyển động."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Skeuomorphism và Neumorphism.",
     "Neumorphism: Đây là skeuomorphism vì bề mặt bắt chước chất liệu THẬT, gọi tên được, như da, giấy, kim loại, với ánh sáng, vân và ẩn dụ đồ vật phong phú. Nó sẽ thành neumorphism nếu mọi chất liệu và vân biến mất và toàn bộ control được đùn ra từ một bề mặt mờ liền khối với cặp bóng mềm.",
     "So với Frutiger Aero: Đây là skeuomorphism khi mục đích là bắt chước một đồ vật hay chất liệu vật lý cụ thể ngay trong giao diện. Nó sẽ thành Frutiger Aero nếu độ bóng còn đó nhưng chất liệu chuyển thành không khí công nghệ-thiên nhiên xanh lam-xanh lục trong như thủy tinh, gồm trời, nước, cỏ, chứ không phải một đồ vật nào được bắt chước."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Bề mặt và chất liệu, cốt lõi: Simulated real materials. Bề mặt trông như làm từ vật lý nào đó, như da, giấy, vải lanh, kim loại chải, nỉ xanh, thường kèm vân hoặc thớ nhìn thấy được.",
     "• Bề mặt và chất liệu, nên tránh: Flat unshaded fills. Các mảng lớn một màu phẳng không có ánh sáng phá ảo giác; đó là cánh cửa quay về Flat Design.",
     "• Chiều sâu và ánh sáng, cốt lõi: Physical lighting model. Vệt sáng bóng, vát cạnh và bóng trong gợi ra nguồn sáng: nút phồng ra, ô nhập lõm vào, cạnh bắt sáng.",
     "• Chiều sâu và ánh sáng, phụ trợ: Glossy gradient controls. Nút và thanh mang gradient dọc có vệt sáng phản chiếu ở trên, vẻ 'gel' hay 'aqua' của nhựa bấm được.",
     "• Hình ảnh và đồ trang trí, cốt lõi: Real-object metaphors. UI được vẽ CHÍNH LÀ đồ vật mà nó thay thế: sổ ghi chú giấy kẻ dòng, giá sách đầy bìa, núm xoay.",
     "• Hình học và viền, cốt lõi: Crafted physical details. Đường khâu, mép giấy rách, chữ dập nổi hoặc in ép, đinh tán; những dấu vết trang trí về cách vật 'thật' được chế tạo.",
     "• Màu và độ tương phản, biến thiên: Palette follows the material. Màu đến từ chất liệu được mô phỏng (da nâu vàng, vải lanh xám), nên gần như bảng màu nào cũng có thể skeuomorphic."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• CSS cho control bóng nổi: gradient dọc từ #fdfdfd tới #d8d8d8, kèm box-shadow gồm vệt sáng inset ở cạnh trên và một bóng đổ nhỏ phía dưới. Vệt sáng trên cộng bóng đổ.",
     "• CSS cho ô lõm: box-shadow inset 0 2px 4px đen alpha .35 trên nền #f3efe6. Bóng trong nhấn ô xuống bề mặt.",
     "• CSS cho chữ in ép/dập nổi trên chất liệu sáng: text-shadow 0 1px 0 trắng alpha .6."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• Chữ trên nền có vân (da, vải lanh, gỗ) cần được đo tương phản 4.5:1 ở VÙNG RỐI nhất của vân, không phải ở màu trung bình.",
     "• Vát cạnh và độ bóng trang trí không được là dấu hiệu duy nhất của nhấn/không nhấn; hãy gắn trạng thái với đổi màu hoặc đổi nội dung.",
     "• Ảnh vân nặng làm tăng dung lượng trang; hãy nén chúng và để UI tự đứng được khi không có chúng."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Cổ như chính GUI (ẩn dụ màn hình nền thập niên 1980), nhưng nhãn phong cách thường chỉ về thời 2007 đến 2012 của Apple: lịch da, Game Center nỉ và app Podcasts băng cuộn của iOS dưới thời Scott Forstall, chấm dứt công khai bằng bản thiết kế lại phẳng của iOS 7 năm 2013.",
     "Nguồn: bài Skeuomorphism 101 của Nielsen Norman Group, và bài về Flat Design của họ (phong trào đối lập)."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Neumorphism: Phong cách (Style)",
     "Flat Design: Phong cách (Style)",
     "Frutiger Aero: Phong cách (Style)",
     "Y2K Digital Aesthetic: Phong cách (Style)",
     "Aqua: Phong cách (Style)"
    ]
   }
  ],
  "card": {
   "label": "",
   "quote": "app trông như cuốn sổ da thật",
   "tags": [
    "mô phỏng chất liệu thật",
    "mô hình ánh sáng vật lý",
    "ẩn dụ đồ vật có thật"
   ]
  }
 },
 "styles/vernacular-web": {
  "title": "Vernacular Web",
  "lead": "Vernacular Web là kiến trúc dân gian của web thuở đầu: các trang chủ cá nhân do người nghiệp dư dựng từ những vật liệu sưu tầm, gồm nền sao lát gạch, gif lấp lánh và lửa động, đường kẻ cầu vồng, banner 'welcome to my home page', bộ đếm khách, link sổ lưu bút, biển đang xây dựng và huy hiệu webring. Nó trang trí, cá nhân và chân thành: mỗi món được chọn vì chủ nhân yêu thích, không phải vì có hệ thống nào quy định.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: nhãn hồi tưởng.",
     "Do nghệ sĩ mạng Olia Lialina đặt tên trong bài tiểu luận 'A Vernacular Web' năm 2005 cho các trang cá nhân nghiệp dư giữa thập niên 90; diện mạo này đã tồn tại cả chục năm trước khi có tên.",
     "Còn được gọi là: the amateur web.",
     "Minh họa: bấm vào bộ đếm, bạn chính là vị khách. Toàn là trang trí, toàn là chân thành."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "Mục này nói về diện mạo nghiệp dư thật của thập niên 90 và các bản hồi sinh trung thực của nó. Thiết kế cố ý hỏng, 'xấu có chủ đích' mang tính mỉa mai là một nước đi khác (Internet Ugly, đang nghiên cứu), còn cấu trúc thô phơi ra là Web Brutalism."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Vernacular Web.",
     "• trang geocities cũ đầy gif lấp lánh",
     "• biển đang xây dựng và bộ đếm khách",
     "• nền sao lát gạch với đường kẻ cầu vồng",
     "• chữ NEW nhấp nháy và link sổ lưu bút",
     "• kiểu trang chủ cá nhân thập niên 90",
     "• welcome to my home page với ngọn lửa động"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• Tiled background texture (bề mặt và chất liệu): một ảnh nhỏ lặp kín từ mép này sang mép kia, như bầu trời sao đêm, mây, đá cẩm thạch, phía sau mọi thứ; trang có giấy dán tường chứ không có màu nền.",
     "• Animated GIF ornaments (hình ảnh và đồ trang trí): các tia lấp lánh, ký hiệu @ xoay, đường kẻ rực lửa, biển UNDER CONSTRUCTION kẻ sọc; những hoạt ảnh nhỏ lặp lại chỉ để trang trí.",
     "• Collected badges and counters (bố cục và bố trí): bộ đếm khách, 'sign my guestbook', nút prev/next của webring, huy hiệu 'best viewed in Netscape'; những chiếc cúp tham gia xếp ở chân trang.",
     "• Default type, loud accents (kiểu chữ): chữ serif hệ thống hoặc Comic Sans trên giấy dán tường, căn giữa, kèm đường kẻ ngang cầu vồng và nhấn nhiều màu hoặc nhấp nháy; chữ như một lễ hội chứ không phải hệ thống."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng bề mặt theo phong cách Vernacular Web, tức một trang chủ cá nhân chân thành thời GeoCities thập niên 90, không phải bản nhại. Dấu hiệu định nghĩa: ảnh nền lát lặp (bầu trời sao nhận ra ngay); đồ trang trí kiểu gif hoạt hình, như tia lấp lánh và huy hiệu đang xây dựng kẻ sọc; một cột chữ serif hệ thống căn giữa với đường kẻ ngang gradient cầu vồng giữa các phần; chân trang sưu tầm huy hiệu tham gia gồm bộ đếm khách chữ số LED xanh lá trên nền đen, link 'sign my guestbook', huy hiệu webring, và dòng 'best viewed at 800x600'. Chữ nhấn nhiều màu hoặc nhấp nháy là đúng thời kỳ. Giữ linh hoạt các món trang trí cụ thể, vì không khí là cuốn sổ lưu niệm trang hoàng của một người nghiệp dư đầy tự hào. Đừng trôi sang web brutalism: trang này được trang trí bằng tình yêu, không bao giờ bị lột trần như một tuyên ngôn. Giữ khả năng đọc (panel đặc hoặc tương phản cao phía sau chữ khi nền lát rối), tôn trọng prefers-reduced-motion bằng cách dừng nhấp nháy và lấp lánh, và giữ bộ đếm và huy hiệu ở vai trò trang trí chứ không phải tuyên bố chức năng."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Vernacular Web và Web Brutalism.",
     "Web Brutalism: Đây là Vernacular Web vì trang được TRANG TRÍ bằng tình yêu, với giấy dán tường, tia lấp lánh, huy hiệu, bộ đếm, do một người nghiệp dư khoe bộ sưu tập của mình. Nó sẽ thành web brutalism nếu mọi trang trí bị lột bỏ và bộ khung HTML trần, gồm chữ mặc định, link xanh, không đồ trang trí, được phơi ra như một tuyên ngôn có chủ ý của nhà thiết kế.",
     "So với Y2K Digital Aesthetic: Đây là Vernacular Web vì vật liệu là đồ tự làm và sưu tầm, như tia lấp lánh trong bộ gif và giấy dán tường lát gạch, mang tính cá nhân và nghiệp dư. Nó sẽ thành Y2K nếu đồ trang trí trở nên chuyên nghiệp và tương lai, như crôm lỏng, lens flare và gradient ánh cầu vồng lấy từ tờ rơi tiệc rave."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Bề mặt và chất liệu, cốt lõi: Tiled background texture. Một ảnh nhỏ lặp kín từ mép này sang mép kia (bầu trời sao đêm, mây, đá cẩm thạch) phía sau mọi thứ; trang có giấy dán tường chứ không có màu nền.",
     "• Hình ảnh và đồ trang trí, cốt lõi: Animated GIF ornaments. Tia lấp lánh, ký hiệu @ xoay, đường kẻ rực lửa, biển UNDER CONSTRUCTION kẻ sọc; hoạt ảnh nhỏ lặp lại chỉ để trang trí.",
     "• Hình ảnh và đồ trang trí, nên tránh: Knowing irony or rawness. Khi phần trang trí trở thành tuyên bố có chủ ý về chính thiết kế (cấu trúc phơi ra, xấu có chủ đích), nó hết là vernacular mà thành brutalism hoặc phản thiết kế.",
     "• Bố cục và bố trí, cốt lõi: Collected badges and counters. Bộ đếm khách, 'sign my guestbook', nút prev/next của webring, huy hiệu 'best viewed in Netscape'; những chiếc cúp tham gia xếp ở chân trang.",
     "• Bố cục và bố trí, phụ trợ: One centered column. Mọi thứ căn giữa xuống một cột hẹp, từng phần một, theo cách thẻ <center> làm cho dễ dàng.",
     "• Kiểu chữ, cốt lõi: Default type, loud accents. Serif hệ thống hoặc Comic Sans trên giấy dán tường, căn giữa, với đường kẻ ngang cầu vồng và nhấn nhiều màu hoặc nhấp nháy; chữ như lễ hội chứ không phải hệ thống.",
     "• Chuyển động, biến thiên: Ambient extras. MIDI tự phát, vệt con trỏ, marquee cuộn; những món thêm được yêu thích, khác nhau tùy trang."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• CSS cho giấy dán tường và cột căn giữa, chiếm nửa diện mạo chỉ trong một quy tắc: nền đen kèm ảnh stars.gif lặp, chữ căn giữa nhờ text-align, và họ chữ serif là Times New Roman.",
     "• CSS cho đường kẻ cầu vồng giữa các phần: nền linear-gradient 90deg đi qua đỏ, cam, vàng, xanh chanh, xanh lơ, xanh lam, tím hồng; cao 4px.",
     "• CSS cho chữ NEW! nhấp nháy: @keyframes blink ẩn phần tử ở giữa chu kỳ, áp lên .new trong 1s theo steps(1), lặp vô hạn. Nhớ chặn sau prefers-reduced-motion."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• Chữ nằm thẳng trên nền lát rối thì không đọc được; hãy đặt nội dung trên một panel đặc và để giấy dán tường cho phần lề.",
     "• Nhấp nháy và lấp lánh phải dừng khi có prefers-reduced-motion, và không thứ gì được nháy nhanh hơn 3 lần một giây (ngưỡng co giật của WCAG).",
     "• Chữ màu cầu vồng và neon hiếm khi đạt 4.5:1 trên nền tối; hãy dành chúng để trang trí, còn chữ nội dung giữ trơn và tương phản cao."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Web hosting miễn phí giữa thập niên 1990 (GeoCities, Angelfire, Tripod), nơi hàng triệu tác giả lần đầu trang hoàng trang của mình từ các bộ sưu tập gif dùng chung. Olia Lialina ghi lại và đặt tên cho nền văn hóa này trong 'A Vernacular Web' (2005) và cùng Dragan Espenschied lưu giữ một terabyte GeoCities trước khi nó đóng cửa năm 2009.",
     "Nguồn: bài tiểu luận đặt tên A Vernacular Web của Olia Lialina, và One Terabyte of Kilobyte Age, kho ảnh chụp màn hình GeoCities."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Web Brutalism: Phong cách (Style)",
     "Y2K Digital Aesthetic: Phong cách (Style)"
    ]
   }
  ],
  "card": {
   "label": "Nhãn hồi tưởng",
   "quote": "trang geocities cũ đầy gif lấp lánh",
   "tags": [
    "họa tiết nền lát gạch",
    "gif động làm đồ trang trí",
    "huy hiệu và bộ đếm sưu tầm"
   ]
  }
 },
 "styles/web-brutalism": {
  "title": "Web Brutalism",
  "lead": "Web Brutalism coi chính chất liệu của trình duyệt là bề mặt hoàn chỉnh: font mặc định hoặc font hệ thống, link trông như chưa tạo kiểu, cấu trúc tài liệu hiện rõ, viền và đường kẻ ngang trơn, mật độ được đặt trên sự bóng bẩy. Không gì giả làm thứ khác, không có gradient bắt chước kính, không có bóng bắt chước chiều sâu. Ở mức tốt nhất nó trung thực và nhanh (Craigslist, Hacker News, các trang cá nhân thuở đầu web); ở mức tệ nhất, nhãn này bị kéo giãn ra phủ lên mọi thứ chưa được trau chuốt.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: nhãn còn gây tranh cãi.",
     "Những người thực hành bất đồng về phạm vi: cách hiểu chặt là 'chất liệu thô của trình duyệt, cấu trúc trung thực' (theo phép ẩn dụ béton brut); cách hiểu lỏng gộp mọi site xấu có chủ ý. Mục này theo cách hiểu chặt và xếp diện mạo ồn ào có viền vào Neobrutalism.",
     "Còn được gọi là: brutalist web design, hoặc raw web, hoặc default HTML look.",
     "Minh họa: trang chủ của Martin, cập nhật hôm thứ Ba, không cookie, không theo dõi, với tiểu luận về website giản dị, kho tệp, sổ lưu bút và nút Submit do chính trình duyệt cung cấp."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "Khác với Brutalism kiến trúc (bê tông trần và khối lớn, nguồn gốc của phép ẩn dụ), và khác với Neobrutalism (diện mạo đồ họa được tạo kiểu, bão hòa, viền dày, chẳng hề mặc định). Diện mạo trang cá nhân hoài niệm với bảng và gif là Vernacular Web, một mục riêng (sẽ có sau)."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Web Brutalism.",
     "• website html thô xấu xí",
     "• site trông như chưa viết css",
     "• chỉ có Times New Roman và link xanh",
     "• diện mạo trơ xương kiểu craigslist",
     "• trang web phơi cấu trúc ra mà không trang trí"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• Browser-default materials (kiểu chữ): serif Times/hệ thống hoặc monospace, link xanh mặc định có gạch chân, tím khi đã thăm; bộ chữ trông như chưa tạo kiểu dù là có chủ ý.",
     "• Exposed document structure (bố cục và bố trí): trang đọc như một tài liệu: tiêu đề, danh sách, bảng và đường chia <hr> theo thứ tự nguồn; cấu trúc CHÍNH LÀ bố cục.",
     "• Zero decorative rendering (chiều sâu và ánh sáng): không bóng, gradient, bo góc hay chất liệu bắt chước; tối đa viền đặc 1px. Nền trắng phẳng (hoặc một màu).",
     "• Utility-first density (bố cục và bố trí): thông tin nén chặt và tải tức thì; lập luận thẩm mỹ là tốc độ và sự trung thực, không phải cái đẹp."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng trang theo Web Brutalism chặt chẽ. Dấu hiệu định nghĩa: chất liệu mặc định của trình duyệt (serif Times/hệ thống hoặc monospace, link xanh mặc định có gạch chân); cấu trúc tài liệu lộ ra, gồm tiêu đề, danh sách, bảng, đường kẻ ngang theo thứ tự nguồn; không có hiệu ứng trang trí nào (không bóng, gradient hay bo góc; tối đa viền đặc 1px trên nền trơn); mật độ thực dụng tải ngay lập tức. Giữ linh hoạt việc chọn monospace hay serif và điểm nhấn chữ hoa. Dùng HTML ngữ nghĩa với CSS tối thiểu, vì style mặc định của UA chính là thiết kế; tránh các reset làm mềm chúng. Đừng trôi sang Neobrutalism; điểm quyết định là ở đây không có gì được tạo kiểu để trông thô, còn khối màu bão hòa, viền dày được thiết kế và bóng lệch sẽ biến nó thành một bộ trang phục đồ họa. Giữ cỡ chữ đọc được, focus thấy được, và gợi ý link trung thực (gạch chân được giữ)."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Web Brutalism và Neobrutalism.",
     "Neobrutalism: Đây là Web Brutalism vì trang thực sự được dựng từ mặc định của trình duyệt, gồm chữ hệ thống, link xanh, cấu trúc trần, hoàn toàn không có hiệu ứng trang trí. Nó sẽ thành Neobrutalism nếu sự thô ráp được tạo kiểu: khối màu bão hòa, viền đen dày đồng nhất, bóng lệch cứng và chữ hiển thị mập, tức một ngôn ngữ đồ họa được thiết kế chứ không phải mặc định."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Kiểu chữ, cốt lõi: Browser-default materials. Serif Times/hệ thống hoặc monospace, link xanh mặc định có gạch chân, tím khi đã thăm; bộ chữ trông như chưa tạo kiểu dù là có chủ ý.",
     "• Kiểu chữ, biến thiên: Monospace / all-caps accents. Nhiều site brutalist đổi sang monospace hoặc chữ hoa 'hét' để có hương vị; số khác giữ serif thuần. Cả hai đều được tính.",
     "• Bố cục và bố trí, cốt lõi: Exposed document structure. Trang đọc như một tài liệu: tiêu đề, danh sách, bảng và đường chia <hr> theo thứ tự nguồn; cấu trúc CHÍNH LÀ bố cục.",
     "• Bố cục và bố trí, cốt lõi: Utility-first density. Thông tin nén chặt và tải tức thì; lập luận thẩm mỹ là tốc độ và sự trung thực, không phải cái đẹp.",
     "• Chiều sâu và ánh sáng, cốt lõi: Zero decorative rendering. Không bóng, gradient, bo góc hay chất liệu bắt chước; tối đa viền đặc 1px. Nền trắng phẳng (hoặc một màu).",
     "• Màu và độ tương phản, nên tránh: Styled 'rawness'. Khối màu bão hòa, viền dày được thiết kế và bóng lệch cứng là bộ trang phục của sự thô ráp; đó là Neobrutalism."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• HTML: các thẻ <h1>, <hr>, <table>, <ul> với style mặc định của UA. Chất liệu CHÍNH LÀ các phần tử.",
     "• CSS nếu buộc phải viết: nhắc lại mặc định, tức font serif Times New Roman, link màu #0000ee, link đã thăm màu #551a8b."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• Brutalism tình cờ lại dễ tiếp cận: cấu trúc ngữ nghĩa, link trung thực, không trang trí ăn mất tương phản, miễn cỡ chữ vẫn đọc được và mật độ chừa đủ vùng chạm lớn.",
     "• Xanh mặc định trên nền trắng đạt tương phản; hãy giữ outline focus mặc định (bỏ nó là nước đi thật sự phản brutalist duy nhất).",
     "• Bảng dày đặc cần header/scope đúng cho trình đọc màn hình; thô về hình thức không là cớ cho thô về cấu trúc."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Được đặt tên theo phép ẩn dụ với béton brut của kiến trúc ('bê tông trần'); cách dùng trên web lan rộng giữa thập niên 2010 qua brutalistwebsites.com của Pascal Deville và các bài như 'split personality of brutalist web development' của Smashing Magazine, như một phản ứng với sự giống hệt nhau của các site startup bóng bẩy.",
     "Nguồn: bài về tính cách phân đôi của phát triển web brutalist trên Smashing Magazine, và bài về Neobrutalism của Nielsen Norman Group (người anh em được tạo kiểu)."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Neobrutalism: Phong cách (Style)",
     "Minimalism: Phong cách (Style)",
     "Vernacular Web: Phong cách (Style)",
     "Form Field: Phong cách (Style)",
     "Focus Ring (:focus-visible): Phong cách (Style)"
    ]
   }
  ],
  "card": {
   "label": "Nhãn còn gây tranh cãi",
   "quote": "website html thô xấu xí",
   "tags": [
    "chất liệu mặc định của trình duyệt",
    "cấu trúc tài liệu phơi ra",
    "hoàn toàn không có hiệu ứng trang trí"
   ]
  }
 },
 "styles/windows-aero": {
  "title": "Windows Aero",
  "lead": "Windows Aero là ngôn ngữ màn hình nền của Microsoft cho Vista và Windows 7: KHUNG cửa sổ được vẽ như kính trong suốt, nhòe, với vệt sáng quét phản chiếu, nên màn hình nền ánh lên qua mọi title bar; gradient màu phát sáng; nút caption sáng lên dưới con trỏ (quầng đỏ của nút đóng); thanh tiến độ xanh lá lấp lánh; và chuyển động cửa sổ mượt như Flip 3D và hiệu ứng thu nhỏ. Thông điệp ra mắt của Microsoft gọi chính lớp kính, các phản chiếu và hoạt ảnh là sản phẩm.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: ngôn ngữ thiết kế của nhà sản xuất.",
     "Tên chính thức của Microsoft cho trải nghiệm màn hình nền Windows Vista/7 (2006), thường được diễn giải là 'Authentic, Energetic, Reflective, Open'; lớp kính được Desktop Window Manager kết xuất.",
     "Còn được gọi là: Aero, hoặc Aero Glass.",
     "Minh họa: rê chuột lên dấu ✕, Aero làm nó ngập đỏ; hình nền ánh xuyên qua khung cửa sổ."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "Mục này nói về phần vỏ hệ điều hành thật của Microsoft (Vista năm 2006 đến Windows 7, bị Windows 8 với Metro phẳng cho nghỉ hưu). Không khí sinh thái-công nghệ bóng loáng rộng hơn của cùng những năm đó, với hình ảnh trời, cỏ, nước, là Frutiger Aero, một nhãn hồi tưởng đã mượn tên Aero."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Windows Aero.",
     "• viền cửa sổ trong suốt của windows 7",
     "• thanh tiêu đề kính mờ từ vista",
     "• nút đóng sáng đỏ khi rê chuột",
     "• cửa sổ có khung trong suốt nhòe",
     "• thanh taskbar bằng kính có phản chiếu",
     "• thanh tiến độ xanh lấp lánh của windows 7"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• Transparent blurred window frame (chiều sâu và ánh sáng): title bar và viền cửa sổ là kính trong mờ thật; hình nền và các cửa sổ phía sau nhòe xuyên qua chúng, còn vùng nội dung của cửa sổ vẫn đục.",
     "• Specular sweeps and reflections (bề mặt và chất liệu): những vệt sáng chéo quét qua kính và control như thể vỏ được đánh bóng; phản chiếu là một phần chất liệu chứ không phải điểm nhấn.",
     "• Glowing hot controls (màu và độ tương phản): control sáng lên dưới con trỏ: nút đóng ngập đỏ, nút thu/phóng sáng xanh, nút nhận một quầng sáng; phát sáng là ngôn ngữ hover.",
     "• Luminous depth gradients (màu và độ tương phản): xanh lam và xanh lục phát sáng như có đèn nền, thanh tiến độ xanh lá lấp lánh và nền nút ánh xà cừ, không bao giờ là màu phẳng."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng bề mặt theo phong cách Windows Aero (Vista/7). Dấu hiệu định nghĩa: khung cửa sổ là kính trong suốt, nhòe, title bar và viền để lộ cảnh phía sau (backdrop-filter blur 12px kèm saturate 1.3 trên lớp phủ trắng/xanh rgba) trong khi vùng nội dung vẫn đục; vệt sáng phản chiếu chéo quét qua kính (một vệt trắng linear-gradient xoay, độ mờ thấp); nút caption PHÁT SÁNG khi hover, nút đóng ngập đỏ với quầng mềm bên ngoài; gradient phát sáng cho phần nhấn, như thanh tiến độ xanh lá lấp lánh (gradient cộng một vệt sáng chạy chậm); viền trong sáng 1px lót mọi tấm kính; góc vỏ bo mềm. Giữ linh hoạt hình nền và bố cục, vì kính cần có thứ nhiều màu phía sau mới đọc ra được. Đừng trôi sang Frutiger Aero: không bắt buộc hình ảnh thiên nhiên, đây là ngôn ngữ phần vỏ chứ không phải bảng cảm hứng của thời đại. Giữ chữ tiêu đề đọc được trên hình nền không đoán trước được (Aero vẽ quầng sáng mềm sau tiêu đề cửa sổ, hãy tái tạo nó), tương phản 4.5:1 cho chữ nội dung, quầng sáng hover đi kèm trạng thái focus thấy được, và phương án giảm chuyển động cho hiệu ứng lấp lánh và hoạt ảnh cửa sổ."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Windows Aero và Frutiger Aero.",
     "Frutiger Aero: Đây là Windows Aero vì nó là chính phần vỏ hệ điều hành, gồm khung cửa sổ kính, nút caption phát sáng, thanh tiến độ sáng, do Microsoft phát hành. Nó sẽ thành Frutiger Aero nếu bạn muốn nói TÂM TRẠNG sinh thái-công nghệ lạc quan của cả thời đại, như hình nền thiên nhiên bóng, giọt nước, bầu trời, thứ bao quanh phần vỏ nhưng không phải phần vỏ.",
     "So với Glassmorphism: Đây là Windows Aero vì kính thuộc về kiến trúc, tức khung và title bar của cửa sổ, kèm vệt sáng quét và control phát sáng trong hệ thống của một hãng. Nó sẽ thành glassmorphism nếu kính tách khỏi phần vỏ cửa sổ để thành những THẺ mờ chung chung nổi trên nền nhiều màu, không bị trói vào hệ điều hành nào.",
     "So với Aqua: Đây là Windows Aero vì chất liệu là kiến trúc trong suốt: bạn nhìn XUYÊN qua phần vỏ thấy màn hình nền phía sau. Nó sẽ thành Aqua nếu độ trong suốt biến thành kẹo đục phát sáng, tức nút gel và sọc mà bạn nhìn VÀO chứ không nhìn xuyên."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Chiều sâu và ánh sáng, cốt lõi: Transparent blurred window frame. Title bar và viền cửa sổ là kính trong mờ thật; hình nền và các cửa sổ phía sau nhòe xuyên qua chúng, còn vùng nội dung của cửa sổ vẫn đục.",
     "• Bề mặt và chất liệu, cốt lõi: Specular sweeps and reflections. Những vệt sáng chéo quét qua kính và control như thể vỏ được đánh bóng; phản chiếu là một phần chất liệu chứ không phải điểm nhấn.",
     "• Màu và độ tương phản, cốt lõi: Glowing hot controls. Control sáng lên dưới con trỏ: nút đóng ngập đỏ, nút thu/phóng sáng xanh, nút nhận quầng sáng; phát sáng là ngôn ngữ hover.",
     "• Màu và độ tương phản, cốt lõi: Luminous depth gradients. Xanh lam và xanh lục phát sáng như có đèn nền, thanh tiến độ xanh lá lấp lánh và nền nút ánh xà cừ, không bao giờ là màu phẳng.",
     "• Chuyển động, phụ trợ: Smooth window choreography. Cửa sổ mở bằng hoạt ảnh, thu nhỏ bằng cú lướt, và xếp chồng trong Flip 3D; chuyển động được ghép lớp chính là mục đích của engine kết xuất mới.",
     "• Hình học và viền, phụ trợ: Softly rounded chrome. Góc cửa sổ và nút bo nhẹ, có các vệt sáng viền 1px lót quanh kính.",
     "• Hình ảnh và đồ trang trí, nên tránh: Nature imagery as requirement. Cỏ, trời và cá thuộc về tâm trạng thời đại chứ không phải vỏ hệ điều hành; nếu cần đến chúng thì bạn đang mô tả Frutiger Aero."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• CSS cho khung kính: nền xanh nhạt trong mờ (rgba 190,215,240 với alpha .35), lớp backdrop-filter nhòe 12px tăng bão hòa 1.3, viền 1px trắng alpha .6, và box-shadow hai lớp gồm viền inset sáng cùng một bóng đổ lớn. Đó là nhòe có pha màu cộng viền sáng kép.",
     "• CSS cho quầng đỏ đặc trưng của nút đóng: ở .close:hover dùng radial-gradient tâm 50% 40% từ #ff9d8a sang #e81123 ở 70%, kèm box-shadow quầng đỏ 10px.",
     "• CSS cho ánh lấp lánh thanh tiến độ Windows 7: gradient dọc từ #8ef08e qua #1fbf3a ở 45% tới #0f9e2c, phủ thêm một dải gradient trắng rộng 30% chạy từ trái sang phải mỗi 2 giây. Hãy dừng nó khi có prefers-reduced-motion."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• Kính trên một hình nền chưa biết khiến chữ tiêu đề khó đoán; chính Aero đã vẽ một quầng trắng mềm phía sau caption, bạn hãy làm vậy hoặc bảo đảm một lớp nhuộm tối.",
     "• Quầng sáng hover vô hình với người dùng bàn phím; mọi control phát sáng cần một xử lý :focus-visible rõ ràng không kém.",
     "• backdrop-filter trên nội dung có hoạt ảnh rất tốn; trên thiết bị yếu hãy cung cấp phương án đặc (chính Vista đã phát hành 'Aero Basic' vì đúng lý do này)."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Phát hành cùng Windows Vista năm 2006 (các bản cao cấp) như ngọn cờ đầu của kết xuất ghép lớp mới trong Desktop Window Manager, được tinh chỉnh và trở thành mặc định ở Windows 7 (2009); Windows 8 (2012) gỡ lớp kính để thay bằng vỏ Metro phẳng.",
     "Nguồn: thông báo dòng sản phẩm Windows Vista của Microsoft năm 2006 (có mô tả Aero), và Microsoft Learn về Desktop Window Manager (engine đằng sau lớp kính)."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Frutiger Aero: Phong cách (Style)",
     "Glassmorphism: Phong cách (Style)",
     "Aqua: Phong cách (Style)"
    ]
   }
  ],
  "card": {
   "label": "Ngôn ngữ thiết kế của nhà sản xuất",
   "quote": "viền cửa sổ trong suốt của windows 7",
   "tags": [
    "khung cửa sổ trong suốt có làm mờ",
    "vệt phản chiếu và ánh sáng quét",
    "control phát sáng khi rê chuột"
   ]
  }
 },
 "styles/y2k": {
  "title": "Y2K Digital Aesthetic",
  "lead": "Thẩm mỹ số Y2K là sự lạc quan công nghệ của thời bước sang thiên niên kỷ được thể hiện theo nghĩa đen: crôm lỏng và kim loại chải, bề mặt gel và nhựa bóng, bảng màu xanh bạc ánh cầu vồng, quả cầu và cục blob, chữ techno bản rộng, và mọi thứ đều dựng 3D. Đó là diện mạo của một tương lai được tưởng tượng qua công nghệ tiêu dùng mới (iMac trong mờ, CGI thuở đầu, tờ rơi rave và thương hiệu 'cyber'), bóng bẩy, nhân tạo và không ngượng ngùng.",
  "sections": [
   {
    "h": "Định danh",
    "p": [
     "Phân loại: nhãn hồi tưởng.",
     "Một nhãn hồi tưởng: thời đại này (khoảng 1997 đến 2004) không tự gọi mình là Y2K; cái tên do những người hồi sinh thập niên 2010 đến 2020 và các nhà biên mục thẩm mỹ gán cho (CARI xếp phần lớn nó dưới 'Metalheart').",
     "Còn được gọi là: Y2K aesthetic, hoặc millennium style, hoặc cybercore, hoặc Metalheart.",
     "Minh họa: vỏ crôm, nút gel, đêm ánh cầu vồng, tương lai của năm 1999."
    ]
   },
   {
    "h": "Phạm vi",
    "p": [
     "Mục này nói về diện mạo số/đồ họa, không phải thời trang Y2K. Nhánh retro tối hơn với lưới neon là Synthwave/Retrofuturism (các mục sau này); người kế nhiệm bóng loáng thấm nhuần THIÊN NHIÊN là Frutiger Aero, một mục riêng và là hàng xóm gần nhất của mục này."
    ]
   },
   {
    "h": "Nếu bạn từng gọi nó là…",
    "p": [
     "…thì ý bạn là Y2K Digital Aesthetic.",
     "• giao diện kẹo cao su crôm của thời điểm bước sang thiên niên kỷ mới",
     "• chữ kim loại bóng với lens flare như bìa đĩa CD cũ",
     "• kiểu tương lai bạc và xanh điện của những năm 2000",
     "• nút bong bóng nhựa bóng giống Mac thuở đầu",
     "• kiểu tờ rơi rave nhãn dán crôm ánh cầu vồng"
    ]
   },
   {
    "h": "Dấu hiệu định nghĩa",
    "p": [
     "• Liquid chrome and metal (bề mặt và chất liệu): crôm bóng gương, thép chải và gradient bạc; chữ và khung được vẽ như thể đã gia công và đánh bóng.",
     "• Gel and glossy plastic (chiều sâu và ánh sáng): nút và blob trong mờ như kẹo với vệt sáng phản chiếu mạnh, độ bóng 'muốn liếm' của thời Aqua.",
     "• Iridescent blue-silver palette (màu và độ tương phản): xanh điện, bạc, trắng và những chuyển ánh holographic xanh lơ-hồng tím; màu lạnh, nhân tạo, hiếm khi mang chất đất.",
     "• Wide techno type (kiểu chữ): font techno bản rộng, bo tròn hoặc vuông (hương vị Eurostile), thường nghiêng, tạo viền hoặc phủ crôm."
    ]
   },
   {
    "h": "Style brief: dán vào agent",
    "p": [
     "Hãy dựng sản phẩm theo thẩm mỹ số Y2K. Dấu hiệu định nghĩa: bề mặt crôm lỏng/kim loại (nền gradient bạc có vệt sáng gương); nút gel và blob trong mờ bóng với vệt sáng mạnh ở phía trên; bảng màu xanh điện/bạc/trắng ánh cầu vồng, thỉnh thoảng có chuyển ánh holographic xanh lơ-hồng tím; chữ hiển thị techno bản rộng (hương vị Eurostile, thường nghiêng hoặc phủ crôm). Phần phụ trợ, dùng tiết chế: quả cầu dựng 3D, địa cầu, lưới khung dây, lens flare, nhãn chữ pixel nhỏ xíu. Giữ linh hoạt nhiệt độ bảng màu chính xác và mật độ trang trí. Dùng gradient CSS nhiều lớp cho crôm (các điểm dừng sáng/tối xen kẽ), vệt sáng radial-gradient cho gel, và background-clip: text cho chữ phủ crôm. Đừng trôi sang Frutiger Aero; điểm quyết định là sự lạc quan của Y2K là nhân tạo, không cỏ, nước, trời hay ảnh thiên nhiên. Giữ chữ đọc được (chữ crôm cần nền tối hoặc viền để đạt 4.5:1), trạng thái focus thấy được, và hỗ trợ giảm chuyển động cho mọi vệt sáng quét."
    ]
   },
   {
    "h": "Hay bị nhầm với",
    "p": [
     "Trang có phần so sánh cạnh nhau: cùng một app nhỏ được vẽ ở cả hai phong cách, chỉ có phong cách đổi, nên khác biệt bạn thấy chính là khác biệt thật. Cặp so sánh là Y2K Digital Aesthetic và Frutiger Aero.",
     "Frutiger Aero: Đây là Y2K vì sự lạc quan là nhân tạo, gồm crôm, nhựa gel, xanh bạc ánh cầu vồng, chữ techno; tương lai là máy móc và không gian mạng. Nó sẽ thành Frutiger Aero nếu độ bóng còn đó nhưng thiên nhiên tràn vào, tức bầu trời xanh, nước, cỏ và bong bóng hòa với chữ humanist sạch thành sự lạc quan Web 2.0 sinh thái-công nghệ.",
     "So với Skeuomorphism: Đây là Y2K khi độ bóng và crôm là tâm trạng vị lai áp lên đồ họa nói chung. Nó sẽ thành skeuomorphism nếu phần kết xuất bắt chước các đồ vật và chất liệu thật cụ thể vì sự quen thuộc thao tác chứ không vì chủ nghĩa tương lai."
    ]
   },
   {
    "h": "Full style DNA",
    "p": [
     "• Bề mặt và chất liệu, cốt lõi: Liquid chrome and metal. Crôm bóng gương, thép chải và gradient bạc; chữ và khung được vẽ như đã gia công và đánh bóng.",
     "• Chiều sâu và ánh sáng, cốt lõi: Gel and glossy plastic. Nút và blob trong mờ như kẹo với vệt sáng phản chiếu mạnh, độ bóng 'muốn liếm' của thời Aqua.",
     "• Màu và độ tương phản, cốt lõi: Iridescent blue-silver palette. Xanh điện, bạc, trắng và những chuyển ánh holographic xanh lơ-hồng tím; màu lạnh, nhân tạo, hiếm khi mang chất đất.",
     "• Kiểu chữ, cốt lõi: Wide techno type. Font techno bản rộng, bo tròn hoặc vuông (hương vị Eurostile), thường nghiêng, tạo viền hoặc phủ crôm.",
     "• Hình ảnh và đồ trang trí, phụ trợ: Orbs, blobs, and wireframes. Quả cầu dựng, blob lỏng, địa cầu, lưới khung dây và lens flare lơ lửng làm đồ trang trí.",
     "• Hình ảnh và đồ trang trí, biến thiên: Pixel/cyber garnish. Chữ pixel nhỏ, scanline và vỏ giao diện 'cyber' xuất hiện ở một số nhánh mà không ở nhánh khác.",
     "• Hình ảnh và đồ trang trí, nên tránh: Nature imagery. Cỏ, nước, cá và trời chuyển tâm trạng từ chủ nghĩa tương lai nhân tạo sang sinh thái-công nghệ; đó là địa hạt Frutiger Aero."
    ]
   },
   {
    "h": "Trong code: các điểm khởi đầu tùy chọn",
    "p": [
     "Bản brief ở trên không gắn framework nào; dưới đây là vài điểm bám cụ thể nếu stack của bạn khớp.",
     "• CSS cho thanh crôm: gradient dọc đi từ #fdfdfd qua #c9cdd4 ở 45%, rồi nhảy đột ngột sang #8f96a3 ở 50% và kết thúc ở #e8ebf0. Điểm dừng cứng ở giữa giả đường chân trời của gương.",
     "• CSS cho nút gel: radial-gradient trắng đậm mờ dần ở đỉnh làm mũ bóng kẹo, đặt lên nền xanh bão hòa #2f7df6, border-radius 999px thành viên thuốc.",
     "• CSS cho chữ hiển thị phủ crôm: background-clip: text và color: transparent, lấy từ gradient crôm."
    ]
   },
   {
    "h": "Khả năng tiếp cận và dùng sai",
    "p": [
     "• Chữ gradient crôm về bản chất là trang trí: hãy đặt nó trên một tấm đặc tối hoặc nhân đôi bằng chữ thật tương phản cao, vì các xám giữa của gradient tự nó trượt 4.5:1.",
     "• Độ bóng phản chiếu ăn mất tương phản của nhãn trên nút gel; hãy giữ mực chữ tối/trắng so với vùng TỐI NHẤT của nút.",
     "• Lens flare và vệt sáng quét là món chuyển động trang trí; hãy tắt khi có prefers-reduced-motion."
    ]
   },
   {
    "h": "Nguồn gốc",
    "p": [
     "Khoảng 1997 đến 2004: iMac G3 trong mờ và Aqua của Apple, CGI thời PlayStation, đồ họa rave kiểu Designers Republic, và thương hiệu 'cyber' của thời dot-com. Được khai quật lại và đặt tên bởi khảo cổ internet những năm 2010 đến 2020 (CARI và các nơi khác) cùng làn sóng thời trang/đồ họa hồi sinh theo sau.",
     "Nguồn: bài của AIGA Eye on Design về việc thẩm mỹ Y2K đã hoàn toàn trở lại, và Consumer Aesthetics Research Institute (CARI) với danh mục thẩm mỹ."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Frutiger Aero: Phong cách (Style)",
     "Aqua: Phong cách (Style)",
     "Vernacular Web: Phong cách (Style)",
     "Skeuomorphism: Phong cách (Style)",
     "Glassmorphism: Phong cách (Style)"
    ]
   }
  ],
  "card": {
   "label": "Nhãn hồi tưởng",
   "quote": "giao diện kẹo cao su crôm của thời điểm bước sang thiên niên kỷ mới",
   "tags": [
    "crôm lỏng và kim loại",
    "gel và nhựa bóng",
    "bảng màu xanh bạc ánh cầu vồng"
   ]
  }
 },
 "page/swift-vs-electron": {
  "title": "Swift vs Electron",
  "lead": "Đây là ngã rẽ đầu tiên khi làm app desktop. Chọn Swift nghĩa là dựng bằng vật liệu của chính Apple: app là app Mac thật và mọi phần tử ở tab macOS của site đều có sẵn, đúng chuẩn gốc. Chọn Electron nghĩa là viết một trang web rồi đóng gói vào cửa sổ trình duyệt riêng; app thực chất là website khoác áo desktop, và từ vựng của nó nằm ở tab Web.",
  "sections": [
   {
    "h": "Không bên nào sai",
    "p": [
     "Lựa chọn này quyết định dự án của bạn nói bằng những tên nào: app Electron không có NSStatusItem bên trong (Electron gọi biểu tượng thanh menu là Tray), còn app Swift thì không có CSS."
    ]
   },
   {
    "h": "Sự đánh đổi, nói thẳng",
    "p": [
     "So sánh Swift (native) với Electron (vỏ web) theo từng tiêu chí:",
     "• Là gì: Swift là ngôn ngữ của Apple cùng các framework gốc (SwiftUI/AppKit). Electron là trình duyệt Chromium cộng Node.js đóng gói quanh app web của bạn.",
     "• Có giống app Mac không: Swift thì tự nhiên có, với menu, sheet, vibrancy thật. Electron chỉ giống nếu bạn tự dựng lại diện mạo Mac bằng CSS.",
     "• Dùng cho: Swift hợp với app chỉ cho Mac cần cảm giác bản địa. Electron hợp với app đa nền tảng dùng chung một codebase web.",
     "• Kích thước app: Swift nhỏ vì dùng framework có sẵn của hệ thống. Electron lớn vì tự mang theo trình duyệt, khoảng 100MB trở lên.",
     "• Kỹ năng cần có: Swift là ngôn ngữ mới với đa số dev web. Electron dùng HTML/CSS/JS/React, thứ dev web vốn đã biết.",
     "• Ví dụ nổi tiếng: Swift có Things, Fantastical, Craft. Electron có VS Code, Slack, Discord, Figma."
    ]
   },
   {
    "h": "Quy tắc ngón tay cái",
    "p": [
     "Chỉ làm cho Mac và muốn nó thuộc về hệ sinh thái này? Chọn Swift. Làm đa nền tảng, hoặc đội của bạn sống trong công nghệ web? Chọn Electron, hay người anh em nhẹ hơn là Tauri, thứ thay trình duyệt đóng kèm bằng trình duyệt của hệ thống."
    ]
   },
   {
    "h": "Prompt đầu tiên: chọn thế giới của bạn",
    "p": [
     "Tin nhắn đầu tiên bạn gửi quyết định agent sẽ dựng trong thế giới nào. Hãy dán prompt hợp với phía bạn: nó đặt stack, những chi tiết native mà agent hay quên, bộ từ vựng, và một mốc đầu tiên nhìn thấy được.",
     "• Bắt đầu app Swift (chỉ cho Mac, cảm giác native ngay từ đầu): Tôi đang bắt đầu một app macOS native hoàn toàn mới. Hãy dựng nó thành app Mac SwiftUI (dự án Xcode, macOS 14+): một cửa sổ chính có thanh bên NavigationSplitView, một toolbar hợp nhất, và hỗ trợ sáng/tối ngay từ đầu. Giữ mọi thứ native: font hệ thống, màu nhấn hệ thống, control chuẩn, không tự vẽ khung. Hãy trao đổi với tôi bằng tên SwiftUI/AppKit (window, sidebar, toolbar, sheet), không dùng thuật ngữ web. Mốc đầu tiên: app trống build và chạy được, hiển thị thanh bên và toolbar.",
     "• Bắt đầu app Electron (công nghệ web, chạy mọi nơi): Tôi đang bắt đầu một app desktop hoàn toàn mới bằng công nghệ web. Hãy dựng thành app Electron với Vite + React + TypeScript: một BrowserWindow có titleBarStyle 'hiddenInset' trên macOS cho gọn gàng, mặc định an toàn (contextIsolation bật, nodeIntegration tắt), và hot reload khi dev. Hãy trao đổi bằng tên web (component, CSS, div, và Tray của Electron cho biểu tượng thanh menu), không dùng thuật ngữ Swift/AppKit. Mốc đầu tiên: cửa sổ mở ra, hiện trang React của tôi, và hot reload hoạt động."
    ]
   },
   {
    "h": "Đọc tiếp",
    "p": [
     "Đã chọn Swift? Hãy đọc tiếp AppKit vs SwiftUI. Đã chọn Electron? Mọi thứ bạn xây đều nằm trong tab Web."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Tauri: Người anh em nhẹ của Electron: cùng giao diện web nhưng app nhỏ hơn nhiều, bên dưới là Rust.",
     "Catalyst: App iPad chạy trên Mac. Không phải native Mac cũng không phải web.",
     "React Native: JavaScript điều khiển các control native, chủ yếu là chuyện của mobile và hiếm gặp trên desktop."
    ]
   }
  ]
 },
 "page/translate": {
  "title": "Bảng đối chiếu tên gọi giữa các framework",
  "lead": "Cùng một phần tử Mac có hai tên thật, mỗi framework một tên. Hãy tìm thứ bạn cần rồi lấy cột đúng với ngôn ngữ dự án của bạn; chưa biết dự án thuộc loại nào thì đọc bài hướng dẫn AppKit vs SwiftUI trước.",
  "sections": [
   {
    "h": "Cách đọc bảng",
    "p": [
     "Bảng có ba cột: thứ cần gọi tên (The thing), tên AppKit và tên SwiftUI. Tổng cộng 63 phép đối chiếu; những thứ có gạch chân sẽ dẫn tới mục minh họa tương ứng."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Alert (macos): AppKit: NSAlert · SwiftUI: .alert(…) hoặc AlertScene",
     "Alternating row backgrounds (macos): AppKit: NSTableView.usesAlternatingRowBackgroundColors · SwiftUI: .alternatingRowBackgrounds(_:)",
     "App menu bar (macos): AppKit: NSApplication.mainMenu · SwiftUI: .commands { … }",
     "Button (macos): AppKit: NSButton · SwiftUI: Button",
     "Checkbox (macos): AppKit: NSButton với kiểu switch · SwiftUI: Toggle + .toggleStyle(.checkbox)",
     "Color well / color picker (macos): AppKit: NSColorWell + NSColorPanel · SwiftUI: ColorPicker",
     "Command group inserted (macos): AppKit: NSMenuItems · SwiftUI: CommandGroup",
     "Confirmation dialog (macos): AppKit: NSAlert · SwiftUI: .confirmationDialog(…)",
     "Context menu (macos): AppKit: NSView.menu / NSMenu · SwiftUI: .contextMenu { … }",
     "Date picker (macos): AppKit: NSDatePicker · SwiftUI: DatePicker",
     "Dialog icon (macos): AppKit: NSAlert.icon · SwiftUI: .dialogIcon(_:)",
     "Disclosure control (macos): AppKit: NSButton.BezelStyle.disclosure / NSOutlineView · SwiftUI: DisclosureGroup",
     "“Don’t show again” checkbox (macos): AppKit: NSAlert.showsSuppressionButton · SwiftUI: .dialogSuppressionToggle(…)",
     "Gauge / level indicator (macos): AppKit: NSLevelIndicator · SwiftUI: Gauge",
     "Help button/link (macos): AppKit: NSHelpManager + NSButton · SwiftUI: HelpLink",
     "Hierarchical table row (macos): AppKit: NSOutlineView row · SwiftUI: DisclosureTableRow",
     "Inspector (macos): AppKit: AppKit có nhiều thành phần tương ứng tùy ngữ cảnh: NSSplitViewItem.Behavior.inspector / NSInspectorBar / NSPanel · SwiftUI: .inspector(…)",
     "List (macos): AppKit: NSTableView · SwiftUI: List",
     "Menu (macos): AppKit: NSMenu · SwiftUI: Menu",
     "Menu bar extra / status item (macos): AppKit: NSStatusItem · SwiftUI: MenuBarExtra",
     "Menu indicator arrow (macos): AppKit: NSPopUpButtonCell.arrowPosition · SwiftUI: .menuIndicator(_:)",
     "Menu item keyboard equivalent (macos): AppKit: NSMenuItem.keyEquivalent · SwiftUI: .keyboardShortcut(_:)",
     "Menu separator (macos): AppKit: NSMenuItem.separator() · SwiftUI: Divider trong một menu",
     "Menu-style status item (macos): AppKit: NSStatusItem + NSMenu · SwiftUI: MenuBarExtra + .menuBarExtraStyle(.menu)",
     "Multi-window scene (macos): AppKit: các instance NSWindowController · SwiftUI: WindowGroup",
     "Navigation split view (macos): AppKit: NSSplitViewController · SwiftUI: NavigationSplitView",
     "Navigation stack (gần đúng) (macos): AppKit: không có tương đương AppKit trực tiếp, gần nhất là NSPageController · SwiftUI: NavigationStack",
     "Open/import panel (macos): AppKit: NSOpenPanel · SwiftUI: .fileImporter(…)",
     "Outline / source list (macos): AppKit: NSOutlineView · SwiftUI: OutlineGroup hoặc List phân cấp",
     "Palette picker (macos): AppKit: NSMatrix hoặc NSSegmentedControl · SwiftUI: Picker + .pickerStyle(.palette)",
     "Paste button (macos): AppKit: NSButton + NSPasteboard · SwiftUI: PasteButton",
     "Pop-up button (macos): AppKit: NSPopUpButton với pullsDown = false · SwiftUI: Picker + .pickerStyle(.menu)",
     "Popover (macos): AppKit: NSPopover · SwiftUI: .popover(…)",
     "Progress bar / spinner (macos): AppKit: NSProgressIndicator · SwiftUI: ProgressView",
     "Pull-down button (macos): AppKit: NSPopUpButton với pullsDown = true · SwiftUI: Menu + .menuStyle(.button)",
     "Radio group (macos): AppKit: các NSButton kiểu radio được nhóm lại · SwiftUI: Picker + .pickerStyle(.radioGroup)",
     "Rename button (macos): AppKit: NSButton / action đổi tên qua responder chain · SwiftUI: RenameButton",
     "Resizable split view (macos): AppKit: NSSplitView · SwiftUI: HSplitView / VSplitView",
     "Save/export panel (macos): AppKit: NSSavePanel · SwiftUI: .fileExporter(…)",
     "Search field (macos): AppKit: NSSearchField · SwiftUI: .searchable(…)",
     "Segmented control (macos): AppKit: NSSegmentedControl · SwiftUI: Picker + .pickerStyle(.segmented)",
     "Settings window (macos): AppKit: preferences NSWindowController · SwiftUI: Settings",
     "Share button / share picker (macos): AppKit: NSSharingServicePicker · SwiftUI: ShareLink",
     "Sheet (macos): AppKit: NSWindow.beginSheet · SwiftUI: .sheet(…)",
     "Sidebar toggle (macos): AppKit: NSSplitViewController.toggleSidebar(_:) · SwiftUI: SidebarCommands / mục toolbar của hệ thống",
     "Single window (macos): AppKit: NSWindow · SwiftUI: Window",
     "Slider (macos): AppKit: NSSlider · SwiftUI: Slider",
     "Stepper (macos): AppKit: NSStepper · SwiftUI: Stepper",
     "Switch (macos): AppKit: NSSwitch · SwiftUI: Toggle + .toggleStyle(.switch)",
     "Tab view (macos): AppKit: NSTabViewController / NSTabView · SwiftUI: TabView + Tab",
     "Table (macos): AppKit: NSTableView · SwiftUI: Table",
     "Table column (macos): AppKit: NSTableColumn · SwiftUI: TableColumn",
     "Table header strip (macos): AppKit: NSTableHeaderView · SwiftUI: .tableColumnHeaders(_:)",
     "Table row (macos): AppKit: NSTableRowView · SwiftUI: TableRow",
     "Toolbar (macos): AppKit: NSToolbar · SwiftUI: .toolbar { … }",
     "Toolbar customization palette (macos): AppKit: tùy biến NSToolbar · SwiftUI: .toolbar(id:content:)",
     "Toolbar item (macos): AppKit: NSToolbarItem · SwiftUI: ToolbarItem",
     "Toolbar item group (macos): AppKit: NSToolbarItemGroup · SwiftUI: ToolbarItemGroup",
     "Toolbar overflow menu (macos): AppKit: menu tràn của NSToolbar · SwiftUI: .toolbarOverflowMenu { … }",
     "Top-level command menu (macos): AppKit: NSMenuItem cấp cao nhất + NSMenu · SwiftUI: CommandMenu",
     "Utility window / tool palette (macos): AppKit: NSPanel · SwiftUI: UtilityWindow",
     "Web link (macos): AppKit: NSTextField kiểu liên kết + NSWorkspace · SwiftUI: Link",
     "Window-style status item (macos): AppKit: NSStatusItem + NSPopover hoặc panel · SwiftUI: MenuBarExtra + .menuBarExtraStyle(.window)"
    ]
   }
  ]
 },
 "page/vs": {
  "title": "Những cặp hay bị nhầm",
  "lead": "Hai thứ nhìn giống nhau nhưng chỉ khác nhau ở một điểm quyết định. Hãy chọn cặp mà bạn đang phân vân; mỗi trang trả lời ngay, rồi chỉ ra các dấu hiệu để bạn tự đối chiếu với điểm ảnh trước mặt.",
  "sections": [
   {
    "h": "Các mục được nhắc",
    "p": [
     "Popover vs. Tooltip: Tooltip hiện khi rê chuột, chỉ chứa nhãn chữ ngắn, và biến mất ngay lúc con trỏ rời đi, bạn không bao giờ bấm được vào trong. Popover mở khi bấm, có thể chứa control thật (form, nút, danh sách), và ở lại cho tới khi bạn đóng. Nếu tương tác được với nội dung của nó thì đó là popover.",
     "Modal vs. Popover: Modal dialog chiếm quyền: nó tự căn giữa, làm tối trang phía sau bằng một lớp scrim, và chặn mọi thứ cho tới khi bạn xử lý xong. Popover thì ở cục bộ: nó neo vào control đã mở nó, phần còn lại của trang vẫn dùng được, và bấm bất cứ đâu khác sẽ lặng lẽ đóng nó.",
     "Dropdown vs. Select vs. Combobox: Dropdown menu chạy các hành động (Rename, Delete…) và không bao giờ giữ một giá trị đã chọn. Select (gọi là pop-up button trên Mac) chọn một giá trị từ danh sách cố định và tiếp tục hiển thị nó về sau. Combobox là một select mà bạn gõ vào được: danh sách lọc theo từng ký tự gõ.",
     "Tabs vs. Segmented Control: Tabs điều hướng: mỗi tab sở hữu panel riêng, và việc chuyển đổi thay toàn bộ vùng nội dung. Segmented control (toggle group) chỉnh sửa: nó đổi cách hiển thị CÙNG một nội dung, như chế độ xem, bộ lọc hay một cài đặt. Cùng dáng một hàng nhãn nhưng làm việc khác nhau.",
     "Accordion vs. Tabs: Cả hai đều giấu các phần cho đến khi được yêu cầu. Tabs nằm trên một hàng ngang và mỗi lúc chỉ hiện đúng một panel. Accordion xếp các phần theo chiều dọc, hợp với nội dung dài và nhãn dài, và có thể để nhiều phần cùng mở một lúc, điều mà tabs không bao giờ làm được.",
     "Toast vs. Alert: Toast trượt vào, xác nhận điều đã xảy ra (\"Saved\"), rồi tự rời đi, bạn không bao giờ phải chạm vào. Alert thì ngắt quãng: nó chặn lại bằng một câu hỏi hoặc cảnh báo và không đi cho tới khi bạn chọn. Nếu thông điệp không cần quyết định nào thì nên là toast.",
     "Tooltip vs. Hover Card: Cả hai đều hiện khi rê chuột. Tooltip là một dòng chữ thuần ngắn gọi tên thứ nằm dưới con trỏ. Hover card là bản xem trước phong phú, có avatar, số liệu, thậm chí cả nút, và bạn có thể đưa con trỏ VÀO trong nó mà nó không biến mất, điều tooltip không bao giờ cho phép.",
     "Context Menu vs. Dropdown: Cùng là menu nhưng khác cách sinh ra. Context menu mở NGAY TẠI CON TRỎ khi nhấp chuột phải (hoặc nhấn giữ) lên chính thứ đó, và các hành động của nó áp dụng cho thứ ấy. Dropdown menu mở TỪ MỘT NÚT NHÌN THẤY ĐƯỢC, neo ngay bên dưới, nên khám phá được mà không cần biết cử chỉ bí mật nào.",
     "Carousel vs. Marquee: Carousel chạy theo từng trang và do người dùng điều khiển: mũi tên, vuốt, và các chấm nhỏ; nó dừng ở chỗ bạn đặt. Marquee tự cuộn thành vòng lặp liền mạch không dứt mà không ai lái. Đó là trang trí nền, như dải logo hay bảng chạy chữ. Nếu có chấm hoặc mũi tên thì nó là carousel.",
     "Lightbox vs. Modal: Lightbox LÀ một modal, chuyên cho media: bấm một ảnh thu nhỏ và ảnh mở lớn lên trên trang bị làm tối, thường có mũi tên trước/sau và bấm ra ngoài để đóng. Gọi là modal dialog khi nó chứa tác vụ như form, xác nhận, cài đặt. Gọi là lightbox khi toàn bộ việc của nó là xem ảnh.",
     "Masonry vs. Bento Grid: Masonry xếp các thẻ có chiều cao CHƯA BIẾT vào cột, kiểu Pinterest: các đường hàng không bao giờ thẳng và nội dung chảy xuống từng cột. Bento grid thì được THIẾT KẾ: các ô kích cỡ khác nhau được đặt tay, bám theo một lưới với cạnh thẳng hàng, như hộp cơm. Feed dùng masonry; trang tiếp thị và dashboard dùng bento.",
     "Sidebar vs. Drawer: Sidebar là đồ nội thất: một cột điều hướng cố định, chia bố cục với nội dung và luôn hiện trên màn hình rộng. Drawer là vị khách: mặc định bị giấu, trượt đè lên trang khi được gọi, thường qua nút hamburger, và rời đi sau khi bạn chọn xong.",
     "Hamburger vs. Kebab (Lines vs. Dots): Ba vạch NGANG là hamburger: nó mở điều hướng chính của site. Ba CHẤM là menu tràn (overflow): chấm dọc là kebab, chấm ngang là meatballs, và nó chứa các hành động bổ sung cho đúng mục mà nó nằm trên đó, không bao giờ là điều hướng.",
     "Easing vs. Spring: Easing uốn cong thời gian: hoạt ảnh chạy trong khoảng thời gian cố định theo một đường cong tốc độ bạn chọn (ease-out, một cubic-bezier). Spring thì tuân theo vật lý, gồm độ cứng, độ giảm chấn, vận tốc ban đầu, nên không có thời lượng định sẵn, có thể vọt quá rồi ổn định, và phản ứng tự nhiên khi bị ngắt giữa chừng.",
     "Stepper vs. Slider: Cả hai đều đổi một con số. Stepper nhích nó theo từng bước nhỏ chính xác, bấm lên rồi bấm xuống, hợp nhất khi giá trị chính xác quan trọng và khoảng giá trị nhỏ. Slider kéo núm quét qua cả khoảng chỉ trong một lần kéo, hợp nhất khi chỉ cần tương đối, như âm lượng hay độ sáng.",
     "Sheet vs. Alert (macOS): Cả hai đều là modal của Mac nhưng có phạm vi khác nhau. Sheet trượt ra từ title bar của MỘT cửa sổ và chỉ chặn cửa sổ đó, phần còn lại của app vẫn dùng được; nó dành cho tác vụ thuộc về tài liệu đó. Alert là cửa sổ nhỏ căn giữa cho cảnh báo hay quyết định, gắn huy hiệu biểu tượng của app.",
     "Empty State vs. Skeleton: Skeleton nghĩa là nội dung ĐANG TỚI: các hình xám nhấp nháy giữ chỗ bố cục trong khi nội dung thật đổ về. Empty state nghĩa là ở đây KHÔNG CÓ GÌ, và nói rõ nên làm gì: một dòng hướng dẫn kèm lời kêu gọi hành động. Đang tải thì dùng skeleton; không có mục nào thì dùng empty state.",
     "Toolbar vs. Menu Bar (macOS): Menu bar là dải duy nhất ở trên cùng MÀN HÌNH (menu Apple, File, Edit) và được mọi app Mac dùng chung lần lượt. Toolbar nằm ở đầu một CỬA SỔ, chứa các nút biểu tượng và ô tìm kiếm của cửa sổ đó, hợp nhất với title bar trong macOS hiện đại."
    ]
   }
  ]
 },
 "vs/accordion-vs-tabs": {
  "title": "Accordion vs. Tabs",
  "lead": "Cả hai đều giấu các phần cho đến khi được yêu cầu. Tabs nằm trên một hàng ngang và mỗi lúc chỉ hiện đúng một panel. Accordion xếp các phần theo chiều dọc, hợp với nội dung dài và nhãn dài, và có thể để nhiều phần cùng mở một lúc, điều mà tabs không bao giờ làm được.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Các phần xếp dọc, mỗi phần có mũi tên chevron hoặc tam giác thì đó là accordion.",
     "• Nhãn nằm trên một hàng ngang ở phía trên thì đó là tabs.",
     "• Có nhiều hơn một phần mở cùng lúc thì là accordion.",
     "• Nhãn quá dài để vừa một hàng trên điện thoại thì bạn cần accordion."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Accordion (Disclosure) (web) · <details>: Các mục xếp chồng mà tiêu đề của chúng bung ra và thu lại nội dung",
     "Tabs (web) · role=\"tablist\": Một hàng nhãn duy nhất để đổi nội dung của một vùng dùng chung"
    ]
   }
  ]
 },
 "vs/carousel-vs-marquee": {
  "title": "Carousel vs. Marquee",
  "lead": "Carousel chạy theo từng trang và do người dùng điều khiển: mũi tên, vuốt, và các chấm nhỏ; nó dừng ở chỗ bạn đặt. Marquee tự cuộn thành vòng lặp liền mạch không dứt mà không ai lái. Đó là trang trí nền, như dải logo hay bảng chạy chữ. Nếu có chấm hoặc mũi tên thì nó là carousel.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Có chấm, mũi tên hoặc thao tác vuốt thì là carousel.",
     "• Trôi liên tục và không có điều khiển nào thì là marquee.",
     "• Nội dung lặp liền mạch, không có mục đầu hay mục cuối thì là marquee."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Carousel (web) · aria-roledescription=\"carousel\": Dải các slide bạn lật qua bằng mũi tên hoặc các chấm nhỏ",
     "Marquee (web) · animation + @keyframes translateX: Nội dung tự cuộn ngang thành vòng lặp bất tận"
    ]
   }
  ]
 },
 "vs/context-menu-vs-dropdown": {
  "title": "Context Menu vs. Dropdown",
  "lead": "Cùng là menu nhưng khác cách sinh ra. Context menu mở NGAY TẠI CON TRỎ khi nhấp chuột phải (hoặc nhấn giữ) lên chính thứ đó, và các hành động của nó áp dụng cho thứ ấy. Dropdown menu mở TỪ MỘT NÚT NHÌN THẤY ĐƯỢC, neo ngay bên dưới, nên khám phá được mà không cần biết cử chỉ bí mật nào.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Không có nút kích hoạt nào thấy được, menu hiện ra đúng chỗ bạn nhấp chuột phải thì là context menu.",
     "• Nó treo từ một nút có nhãn hoặc từ dấu ⋯ thì là dropdown menu.",
     "• Các hành động của nó áp dụng cho mục nằm dưới con trỏ thì là context menu."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Context Menu (macos) · NSMenu: Menu mở ngay tại con trỏ khi nhấp chuột phải hoặc Control-click vào một mục",
     "Popover vs. Dropdown Menu vs. Tooltip (web) · popover: Ba lớp phủ neo vào phần tử với cách kích hoạt, nội dung và luật đóng khác nhau"
    ]
   }
  ]
 },
 "vs/dropdown-vs-select-vs-combobox": {
  "title": "Dropdown vs. Select vs. Combobox",
  "lead": "Dropdown menu chạy các hành động (Rename, Delete…) và không bao giờ giữ một giá trị đã chọn. Select (gọi là pop-up button trên Mac) chọn một giá trị từ danh sách cố định và tiếp tục hiển thị nó về sau. Combobox là một select mà bạn gõ vào được: danh sách lọc theo từng ký tự gõ.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Bấm vào một mục mà nó THỰC HIỆN việc gì đó thì là dropdown menu. Bấm vào một mục mà nó ĐIỀN vào control thì là select.",
     "• Đặt được con trỏ chữ vào và gõ thì là combobox.",
     "• Khi đóng mà hiện giá trị hiện tại thì là select hoặc combobox; nút menu thì chỉ hiện nhãn cố định của nó."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Popover vs. Dropdown Menu vs. Tooltip (web) · popover: Ba lớp phủ neo vào phần tử với cách kích hoạt, nội dung và luật đóng khác nhau",
     "Combobox (Autocomplete / Typeahead) (web) · role=\"combobox\": Ô nhập văn bản đi kèm danh sách gợi ý đã lọc để chọn",
     "Pop-Up Button vs. Pull-Down Button vs. Combo Box (macos) · NSPopUpButton: Ba control macOS trông giống nhau, dùng để chọn giá trị hoặc gọi một hành động trong menu"
    ]
   }
  ]
 },
 "vs/easing-vs-spring": {
  "title": "Easing vs. Spring",
  "lead": "Easing uốn cong thời gian: hoạt ảnh chạy trong khoảng thời gian cố định theo một đường cong tốc độ bạn chọn (ease-out, một cubic-bezier). Spring thì tuân theo vật lý, gồm độ cứng, độ giảm chấn, vận tốc ban đầu, nên không có thời lượng định sẵn, có thể vọt quá rồi ổn định, và phản ứng tự nhiên khi bị ngắt giữa chừng.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Bạn đặt thời lượng bằng mili giây thì là easing.",
     "• Bạn đặt stiffness và damping, còn thời lượng là bao nhiêu tùy vật lý quyết định thì là spring.",
     "• Nó vọt quá đích rồi lắc lư vào chỗ thì là spring.",
     "• Chuyển động kéo rồi thả mà cần thừa hưởng tốc độ của cử chỉ thì dùng spring."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Easing (Timing Function) (web) · transition-timing-function: Đường cong tốc độ của hoạt ảnh, lý do chuyển động trông mượt hay máy móc",
     "Spring Animation (web) · transition={{ type: \"spring\", stiffness, damping }}: Chuyển động theo vật lý, vọt quá đích rồi lắng xuống"
    ]
   }
  ]
 },
 "vs/empty-state-vs-skeleton": {
  "title": "Empty State vs. Skeleton",
  "lead": "Skeleton nghĩa là nội dung ĐANG TỚI: các hình xám nhấp nháy giữ chỗ bố cục trong khi nội dung thật đổ về. Empty state nghĩa là ở đây KHÔNG CÓ GÌ, và nói rõ nên làm gì: một dòng hướng dẫn kèm lời kêu gọi hành động. Đang tải thì dùng skeleton; không có mục nào thì dùng empty state.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Các hình giữ chỗ xám nhấp nháy thì là skeleton.",
     "• Một thông điệp thân thiện và nút kiểu \"Create your first…\" thì là empty state.",
     "• Skeleton nhấp nháy mãi trên một danh sách thật sự trống là lỗi kinh điển; lẽ ra nó phải chuyển thành empty state."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Empty State (web) · <section>: Lời hướng dẫn có chủ đích, hiện khi một màn hình chưa có nội dung",
     "Skeleton vs. Spinner (web) · aria-busy=\"true\": Hai chỉ báo đang tải, một cho bố cục đoán trước được, một cho thời gian chờ không rõ"
    ]
   }
  ]
 },
 "vs/hamburger-vs-kebab": {
  "title": "Hamburger vs. Kebab (Lines vs. Dots)",
  "lead": "Ba vạch NGANG là hamburger: nó mở điều hướng chính của site. Ba CHẤM là menu tràn (overflow): chấm dọc là kebab, chấm ngang là meatballs, và nó chứa các hành động bổ sung cho đúng mục mà nó nằm trên đó, không bao giờ là điều hướng.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Vạch thì là điều hướng. Chấm thì là hành động.",
     "• Ở góc trên của cả site thì là hamburger.",
     "• Nằm trên một thẻ, một hàng hay một bài đăng thì là kebab/overflow, và các hành động của nó áp dụng cho mục đó."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Hamburger Menu (Nav Drawer) (web) · aria-expanded + aria-controls: Nút ba vạch và bảng điều hướng trượt ra khi bấm",
     "The Three Dots (Overflow Menu) (web) · <button>: Chấm ngang, chấm dọc, ba vạch và dấu ba chấm mang những nghĩa khác nhau"
    ]
   }
  ]
 },
 "vs/lightbox-vs-modal": {
  "title": "Lightbox vs. Modal",
  "lead": "Lightbox LÀ một modal, chuyên cho media: bấm một ảnh thu nhỏ và ảnh mở lớn lên trên trang bị làm tối, thường có mũi tên trước/sau và bấm ra ngoài để đóng. Gọi là modal dialog khi nó chứa tác vụ như form, xác nhận, cài đặt. Gọi là lightbox khi toàn bộ việc của nó là xem ảnh.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Mở từ một ảnh và cho thấy chính ảnh đó lớn hơn thì là lightbox.",
     "• Có mũi tên trước/sau để đi qua một thư viện ảnh thì là lightbox.",
     "• Chứa control của form hoặc câu hỏi thì là modal dialog."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Lightbox (web) · <dialog>: Lớp phủ phóng to ảnh khi bấm, làm tối trang phía sau",
     "Modal Dialog vs. Drawer vs. Sheet (web) · <dialog>: Ba mẫu lớp phủ phân biệt theo vị trí, phạm vi và độ sâu của tác vụ"
    ]
   }
  ]
 },
 "vs/masonry-vs-bento-grid": {
  "title": "Masonry vs. Bento Grid",
  "lead": "Masonry xếp các thẻ có chiều cao CHƯA BIẾT vào cột, kiểu Pinterest: các đường hàng không bao giờ thẳng và nội dung chảy xuống từng cột. Bento grid thì được THIẾT KẾ: các ô kích cỡ khác nhau được đặt tay, bám theo một lưới với cạnh thẳng hàng, như hộp cơm. Feed dùng masonry; trang tiếp thị và dashboard dùng bento.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Mép dưới lởm chởm và không thẳng hàng theo chiều ngang thì là masonry.",
     "• Các ô thẳng hàng trên những đường lưới chung, với ô lớn và nhỏ được chọn có chủ ý thì là bento.",
     "• Nội dung đến động (ảnh, bài đăng của người dùng) thì là masonry."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Masonry Layout (Pinterest Grid) (web) · columns: Các thẻ cao thấp khác nhau xếp vào cột mà không để hở giữa các hàng",
     "Bento Grid (web) · display: grid + grid-column: span 2: Một lưới duy nhất với các ô cỡ khác nhau, xếp khít như hộp bento"
    ]
   }
  ]
 },
 "vs/modal-vs-popover": {
  "title": "Modal vs. Popover",
  "lead": "Modal dialog chiếm quyền: nó tự căn giữa, làm tối trang phía sau bằng một lớp scrim, và chặn mọi thứ cho tới khi bạn xử lý xong. Popover thì ở cục bộ: nó neo vào control đã mở nó, phần còn lại của trang vẫn dùng được, và bấm bất cứ đâu khác sẽ lặng lẽ đóng nó.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Có lớp tối mờ phía sau thì là modal (lớp đó là scrim).",
     "• Nó chỉ vào hoặc chạm vào nút đã mở nó thì là popover.",
     "• Vẫn cuộn hoặc bấm được trang phía sau thì là popover.",
     "• Nó đòi một câu trả lời trước khi bạn tiếp tục thì là modal."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Modal Dialog vs. Drawer vs. Sheet (web) · <dialog>: Ba mẫu lớp phủ phân biệt theo vị trí, phạm vi và độ sâu của tác vụ",
     "Popover vs. Dropdown Menu vs. Tooltip (web) · popover: Ba lớp phủ neo vào phần tử với cách kích hoạt, nội dung và luật đóng khác nhau"
    ]
   }
  ]
 },
 "vs/popover-vs-tooltip": {
  "title": "Popover vs. Tooltip",
  "lead": "Tooltip hiện khi rê chuột, chỉ chứa nhãn chữ ngắn, và biến mất ngay lúc con trỏ rời đi, bạn không bao giờ bấm được vào trong. Popover mở khi bấm, có thể chứa control thật (form, nút, danh sách), và ở lại cho tới khi bạn đóng. Nếu tương tác được với nội dung của nó thì đó là popover.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Nó mở ra mà không cần bấm, chỉ do con trỏ đặt lên một thứ thì là tooltip.",
     "• Bên trong có nút, ô nhập hoặc link thì là popover.",
     "• Nó vẫn mở khi bạn dời chuột đi thì là popover; tooltip chết cùng lúc hết hover.",
     "• Trên điện thoại nó không thể là tooltip vì không có hover. Bong bóng mở bằng cú chạm là popover."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Popover vs. Dropdown Menu vs. Tooltip (web) · popover: Ba lớp phủ neo vào phần tử với cách kích hoạt, nội dung và luật đóng khác nhau",
     "Hover Card (web) · HoverCard: Bản xem trước phong phú, không modal, hiện ra từ một tham chiếu đang được rê chuột hoặc focus"
    ]
   }
  ]
 },
 "vs/sheet-vs-alert": {
  "title": "Sheet vs. Alert (macOS)",
  "lead": "Cả hai đều là modal của Mac nhưng có phạm vi khác nhau. Sheet trượt ra từ title bar của MỘT cửa sổ và chỉ chặn cửa sổ đó, phần còn lại của app vẫn dùng được; nó dành cho tác vụ thuộc về tài liệu đó. Alert là cửa sổ nhỏ căn giữa cho cảnh báo hay quyết định, gắn huy hiệu biểu tượng của app.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Gắn vào một cửa sổ và di chuyển theo nó thì là sheet.",
     "• Nhỏ, căn giữa, có biểu tượng, một dòng in đậm và Cancel/OK thì là alert.",
     "• Đặt tên, lưu, xuất thì là sheet. \"Are you sure?\" thì là alert."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Sheet (macos) · NSWindow.beginSheet(_:completionHandler:): Bảng modal gắn vào một cửa sổ macOS chứ không chiếm cả ứng dụng",
     "Alert (macos) · NSAlert: Cửa sổ nhỏ ở giữa có biểu tượng kèm huy hiệu, một dòng in đậm và các nút Cancel/OK"
    ]
   }
  ]
 },
 "vs/sidebar-vs-drawer": {
  "title": "Sidebar vs. Drawer",
  "lead": "Sidebar là đồ nội thất: một cột điều hướng cố định, chia bố cục với nội dung và luôn hiện trên màn hình rộng. Drawer là vị khách: mặc định bị giấu, trượt đè lên trang khi được gọi, thường qua nút hamburger, và rời đi sau khi bạn chọn xong.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Luôn có mặt, nội dung nằm cạnh nó thì là sidebar.",
     "• Trượt vào trên một trang bị làm tối thì là drawer (lớp tối đó là scrim).",
     "• Chỉ hiện sau khi chạm vào ba vạch thì là nav drawer."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Sidebar (Source List) (macos) · NavigationSplitView: Cột điều hướng trong mờ dọc mép trái cửa sổ macOS",
     "Hamburger Menu (Nav Drawer) (web) · aria-expanded + aria-controls: Nút ba vạch và bảng điều hướng trượt ra khi bấm"
    ]
   }
  ]
 },
 "vs/stepper-vs-slider": {
  "title": "Stepper vs. Slider",
  "lead": "Cả hai đều đổi một con số. Stepper nhích nó theo từng bước nhỏ chính xác, bấm lên rồi bấm xuống, hợp nhất khi giá trị chính xác quan trọng và khoảng giá trị nhỏ. Slider kéo núm quét qua cả khoảng chỉ trong một lần kéo, hợp nhất khi chỉ cần tương đối, như âm lượng hay độ sáng.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Giá trị chính xác trong khoảng nhỏ (số bản sao: 1 đến 20) thì là stepper.",
     "• Khoảng liên tục, tùy cảm giác thì là slider.",
     "• Cần gõ số nữa thì dùng stepper đi kèm ô văn bản của nó."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Stepper (macos) · NSStepper: Cặp mũi tên lên xuống gọn nhẹ để tăng hoặc giảm một giá trị",
     "Slider (macos) · NSSlider: Núm tròn kéo dọc thanh trượt để chọn một giá trị trong khoảng"
    ]
   }
  ]
 },
 "vs/tabs-vs-segmented-control": {
  "title": "Tabs vs. Segmented Control",
  "lead": "Tabs điều hướng: mỗi tab sở hữu panel riêng, và việc chuyển đổi thay toàn bộ vùng nội dung. Segmented control (toggle group) chỉnh sửa: nó đổi cách hiển thị CÙNG một nội dung, như chế độ xem, bộ lọc hay một cài đặt. Cùng dáng một hàng nhãn nhưng làm việc khác nhau.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Chuyển đổi làm lộ ra nội dung hoàn toàn khác thì là tabs.",
     "• Chuyển đổi vẽ lại cùng dữ liệu theo cách khác (danh sách/lưới, ngày/tuần) thì là segmented control.",
     "• Nó giữ một cài đặt lâu dài mà app ghi nhớ thì là segmented control."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Tabs (web) · role=\"tablist\": Một hàng nhãn duy nhất để đổi nội dung của một vùng dùng chung",
     "Toggle Group (Segmented Control) (web) · ToggleGroup: Một hàng tùy chọn gọn nối liền nhau, luôn có một lựa chọn được giữ"
    ]
   }
  ]
 },
 "vs/toast-vs-alert": {
  "title": "Toast vs. Alert",
  "lead": "Toast trượt vào, xác nhận điều đã xảy ra (\"Saved\"), rồi tự rời đi, bạn không bao giờ phải chạm vào. Alert thì ngắt quãng: nó chặn lại bằng một câu hỏi hoặc cảnh báo và không đi cho tới khi bạn chọn. Nếu thông điệp không cần quyết định nào thì nên là toast.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Tự biến mất sau vài giây thì là toast.",
     "• Có Cancel/OK và chặn cửa sổ thì là alert.",
     "• Ở đáy hoặc góc màn hình thì là toast. Chính giữa thì là alert."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Toast (Snackbar) (web) · role=\"status\": Thông báo ngắn, không chặn thao tác, hiện lên sau một hành động",
     "Alert (macos) · NSAlert: Cửa sổ nhỏ ở giữa có biểu tượng kèm huy hiệu, một dòng in đậm và các nút Cancel/OK"
    ]
   }
  ]
 },
 "vs/toolbar-vs-menu-bar": {
  "title": "Toolbar vs. Menu Bar (macOS)",
  "lead": "Menu bar là dải duy nhất ở trên cùng MÀN HÌNH (menu Apple, File, Edit) và được mọi app Mac dùng chung lần lượt. Toolbar nằm ở đầu một CỬA SỔ, chứa các nút biểu tượng và ô tìm kiếm của cửa sổ đó, hợp nhất với title bar trong macOS hiện đại.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Ở đầu màn hình và đổi khi bạn chuyển app thì là menu bar.",
     "• Nằm trong cửa sổ, cạnh các traffic light thì là toolbar.",
     "• Menu chữ xổ xuống thì là menu bar. Nút biểu tượng tác động ngay lập tức thì là toolbar."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Toolbar (Unified Title Bar) (macos) · NSToolbar: Hàng thao tác của cửa sổ, gộp liền vào title bar macOS hiện đại",
     "Menu Bar (macos) · NSApp.mainMenu: Dải trên cùng màn hình Mac, từng phần đều được ghi nhãn"
    ]
   }
  ]
 },
 "vs/tooltip-vs-hover-card": {
  "title": "Tooltip vs. Hover Card",
  "lead": "Cả hai đều hiện khi rê chuột. Tooltip là một dòng chữ thuần ngắn gọi tên thứ nằm dưới con trỏ. Hover card là bản xem trước phong phú, có avatar, số liệu, thậm chí cả nút, và bạn có thể đưa con trỏ VÀO trong nó mà nó không biến mất, điều tooltip không bao giờ cho phép.",
  "sections": [
   {
    "h": "Cách phân biệt",
    "p": [
     "• Vài từ chữ thuần gọi tên một control thì là tooltip.",
     "• Bản xem trước của một trang hoặc một người khác thì là hover card.",
     "• Bạn rê chuột vào trong được và bấm các thứ thì là hover card."
    ]
   },
   {
    "h": "Các mục được nhắc",
    "p": [
     "Popover vs. Dropdown Menu vs. Tooltip (web) · popover: Ba lớp phủ neo vào phần tử với cách kích hoạt, nội dung và luật đóng khác nhau",
     "Hover Card (web) · HoverCard: Bản xem trước phong phú, không modal, hiện ra từ một tham chiếu đang được rê chuột hoặc focus"
    ]
   }
  ]
 },
 "web/accordion": {
  "lead": "Bấm vào một câu hỏi: cả hàng là phần kích hoạt (trigger), còn mũi tên chevron xoay là phần chỉ báo (indicator).",
  "sym": [
   "<details>",
   "<summary>"
  ],
  "aka": [
   "disclosure",
   "expandable sections",
   "collapse",
   "expander"
  ],
  "def": "Accordion (còn gọi là Disclosure) là một chồng tiêu đề xếp dọc, mỗi tiêu đề có thể mở ra hoặc đóng lại phần nội dung đi kèm. Khi một mục mở, nội dung bung ngay tại chỗ và đẩy các mục bên dưới xuống; tuỳ mẫu thiết kế mà chỉ cho mở một panel hoặc cho mở nhiều panel cùng lúc. Hai phần tử gốc của HTML là details và summary đã cho sẵn ngữ nghĩa đóng/mở cơ bản.",
  "phrases": [
   "nó có dấu cộng khi đang đóng và dấu trừ khi đang mở",
   "danh sách mà các hàng bấm vào sẽ bung thêm nội dung",
   "mở rộng và thu gọn từng phần",
   "trang FAQ có các câu hỏi bấm được",
   "các panel xếp chồng có mũi tên nhỏ",
   "phần đẩy nội dung bên dưới xuống mỗi khi mở ra"
  ],
  "anatomy": [
   {
    "n": "Disclosure trigger",
    "sym": "<summary>",
    "d": "Câu người ta hay nói là “câu hỏi FAQ mà mình bấm vào để xem câu trả lời”; bộ phận đó tên là disclosure trigger."
   },
   {
    "n": "Disclosure indicator",
    "sym": "<summary>::marker",
    "d": "“Mũi tên nhỏ xoay đi khi hàng được mở” chính là disclosure indicator."
   },
   {
    "n": "Disclosure panel",
    "sym": "<details>",
    "d": "“Vùng chứa câu trả lời, đẩy mọi thứ bên dưới xuống” được gọi là disclosure panel."
   }
  ],
  "prompt": "Hãy dựng một Accordion từ hai phần tử <details> và <summary>. Nếu chỉ cho phép một mục mở tại một thời điểm, đặt cùng một giá trị name cho các phần tử <details> trong nhóm. Giữ nguyên hành vi bàn phím có sẵn của trình duyệt, và tạo hiệu ứng chuyển động cho panel được hé lộ, nhưng đừng thêm aria-expanded thừa; chỉ dùng aria-expanded khi bạn tự viết hoàn toàn một thành phần disclosure riêng.",
  "debug": "Hãy giúp tôi gỡ lỗi accordion (details/summary, Radix Accordion). Loại trừ lần lượt các khả năng sau: height auto không chịu chạy animation (hãy animate grid-template-rows từ 0fr sang 1fr, hoặc dùng interpolate-size); type single so với multiple khiến hai panel cùng mở trong khi chỉ định mở một; marker mặc định của disclosure vẫn hiện cạnh icon tự làm; focus rơi vào bên trong panel đang đóng vì nội dung bị ẩn bằng opacity thay vì display. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "HTML",
    "text": "<details>"
   },
   {
    "lang": "HTML",
    "text": "<summary>"
   },
   {
    "lang": "HTML",
    "text": "name",
    "note": "gom các phần tử details lại thành nhóm để chỉ một cái được mở"
   },
   {
    "lang": "Radix",
    "text": "Accordion"
   }
  ],
  "see": [
   "web/tabs",
   "macos/disclosure-triangle",
   "macos/sidebar"
  ]
 },
 "web/alert-callout-banner": {
  "lead": "Bấm dấu × trên alert vàng nằm trong nội dung. Vị trí quyết định tên gọi: dải trên cùng là banner, còn ô ghi chú nhuộm màu nằm giữa luồng nội dung là callout.",
  "sym": [
   "<Alert severity=\"warning\">",
   "<Alert type=\"warning\" />"
  ],
  "aka": [
   "inline alert",
   "inline notification",
   "callout",
   "admonition",
   "notice",
   "warning box",
   "announcement banner",
   "notification banner",
   "site alert",
   "status banner"
  ],
  "def": "“Cái hộp cảnh báo màu vàng” là một inline alert: thông báo nằm ngay trong dòng chảy nội dung và ở lại cho tới khi vấn đề được xử lý hoặc người dùng tắt đi (với Material UI là <Alert severity=\"warning\">; còn trong Ant Design là <Alert type=\"warning\" />). Cái hộp trông giống hệt nhưng được viết sẵn cùng trang, đứng cạnh phần nội dung mà nó bổ sung ý nghĩa, và thường không đóng được thì gọi là callout, tức admonition trong tài liệu và Markdown, nơi GitHub viết là > [!WARNING]. Thông điệp nổi bật trải hết chiều ngang ở tận đầu trang hoặc đầu site là banner, còn có tên site alert. Cả hai đều không phải toast (toast lơ lửng phía trên layout rồi tự biến mất), cũng không phải alert của macOS (đó là cửa sổ modal chặn bạn cho tới khi bạn trả lời). Cái bẫy đáng nhớ: role=\"banner\" KHÔNG phải role dành cho banner thông báo, vì nó là landmark của phần header site; hãy để banner là markup thường, và chỉ thêm role=\"alert\" hoặc role=\"status\" khi thông điệp được chèn vào trang một cách động.",
  "phrases": [
   "cái hộp cảnh báo màu vàng",
   "thông báo ở giữa trang, giống phần lưu ý, không phải toast",
   "dải màu ở trên cùng",
   "thông báo nhỏ hiện ngay bên trong trang",
   "cái hộp có màu chứa thông tin",
   "thanh tóm tắt trạng thái",
   "banner trạng thái"
  ],
  "anatomy": [
   {
    "n": "Accent border",
    "sym": "border-inline-start",
    "d": "“Đường kẻ màu chạy dọc mép trái của hộp” là accent border (còn gọi leading accent bar). Nó dùng border-inline-start nên sẽ tự chuyển sang mép phải trong bố cục đọc từ phải sang trái."
   },
   {
    "n": "Severity surface",
    "sym": "variant=\"standard\"",
    "d": "“Nền vàng nhạt phía sau cảnh báo” là severity surface: một kiểu khung chứa được nhuộm màu và đổi theo mức độ nghiêm trọng (standard, outlined hoặc filled). Banner xanh và alert vàng thực chất là cùng một kiểu xử lý, chỉ khác mức độ."
   },
   {
    "n": "Severity indicator",
    "sym": "severity=\"warning\"",
    "d": "“Tam giác cảnh báo nhỏ ở bên trái” là severity indicator: icon và màu được chọn cùng nhau theo severity (Material UI) hoặc type (Ant Design), không bao giờ chỉ dựa vào màu."
   },
   {
    "n": "Dismiss control",
    "sym": "onClose",
    "d": "“Dấu x nhỏ bên phải thông báo” là dismiss control. Chính việc có nó khiến thông báo trở thành alert hoặc banner, chứ không còn là callout cố định."
   },
   {
    "n": "Alert action",
    "sym": "action",
    "d": "“Đường link tìm hiểu thêm ở cuối hộp cảnh báo” là alert action: một hành động tiếp theo ngắn gọn như Review settings, đặt trong slot action."
   }
  ],
  "prompt": "Hãy dựng một Inline Alert bằng Material UI <Alert severity=\"warning\"> đặt trong luồng nội dung. Cho nó một nền cảnh báo nhuộm màu nhẹ, một icon mức độ tương ứng, một vạch nhấn hẹp bằng border-inline-start, một thông điệp ngắn gọn và một hành động đi kèm ở cuối (tuỳ chọn); chỉ thêm nút đóng khi việc ẩn thông báo là an toàn. Nếu thông điệp được chèn vào động: dùng role=\"alert\" chỉ cho trường hợp khẩn cấp cần ngắt người dùng, còn role=\"status\" cho cập nhật mang tính tham khảo; callout tĩnh đã có sẵn khi trang tải thì không cần role live region.",
  "debug": "Hãy giúp tôi gỡ lỗi cho thông báo kiểu inline alert, callout hoặc announcement banner (dùng MUI Alert, rồi Ant Design Alert, cùng các vùng aria-live). Loại trừ lần lượt: role=\"banner\" bị gắn lên banner thông báo, trong khi đó là landmark của header trang nên trình đọc màn hình sẽ đọc ra một header site thứ hai thay vì một thông điệp; role=\"alert\" để nguyên trên thông báo vốn đã có trong DOM khi tải trang, nên nó ngắt người dùng ở mỗi lần điều hướng; thông điệp được chèn cùng lúc với chính node live region của nó, tổ hợp trình duyệt và trình đọc màn hình nào đó sẽ không đọc ra (cách chắc ăn là render vùng rỗng trước rồi mới gán chữ vào); mức độ nghiêm trọng chỉ thể hiện bằng màu CSS, nên icon và chữ vẫn nói sai nghĩa; nút đóng gỡ thông báo khỏi DOM khi focus đang ở bên trong, làm focus rơi về body; “banner” bị render bên trong một cột nội dung có cuộn nên thực tế không bao giờ trải hết chiều ngang trang. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "Material UI",
    "text": "<Alert severity=\"warning\">",
    "note": "severity chọn cả icon LẪN màu; variant gồm standard / outlined / filled"
   },
   {
    "lang": "Ant Design",
    "text": "<Alert type=\"warning\" />",
    "note": "chính Alert này sẽ thành banner ở đầu trang khi thêm prop banner"
   },
   {
    "lang": "ARIA",
    "text": "role=\"alert\"",
    "note": "live region mức assertive, chỉ dành cho thông điệp khẩn cấp xuất hiện động"
   },
   {
    "lang": "ARIA",
    "text": "role=\"status\"",
    "note": "live region mức polite cho cập nhật mang tính tham khảo, không được ngắt người dùng"
   },
   {
    "lang": "Markdown",
    "text": "> [!WARNING]",
    "note": "ký hiệu callout/admonition của GitHub; các loại anh em là NOTE, TIP, IMPORTANT, CAUTION"
   },
   {
    "lang": "USWDS",
    "text": ".usa-site-alert",
    "note": "site alert trải hết chiều ngang ở đầu mọi trang"
   },
   {
    "lang": "CSS",
    "text": "border-inline-start",
    "note": "vạch nhấn màu ở đầu hộp callout"
   }
  ],
  "see": [
   "web/toast",
   "web/dialog-drawer-sheet",
   "web/badge-chip-pill",
   "web/header-navbar",
   "macos/alert"
  ]
 },
 "web/avatar-group": {
  "lead": "Bấm vào +4 để bung ra. Hàng vòng tròn ảnh đại diện chồng lên nhau này là Avatar Group (tên cũ: facepile).",
  "sym": [
   "AvatarGroup",
   "AvatarGroupCount"
  ],
  "aka": [
   "facepile",
   "avatar stack",
   "stacked avatars",
   "grouped avatars",
   "avatar pile"
  ],
  "def": "“Những vòng tròn ảnh đại diện chồng lên nhau” là một avatar group: một hàng các vòng Avatar được kéo đè lên nhau bằng margin âm, mỗi vòng có viền màu bằng màu nền để các gương mặt không chảy vào nhau. Fluent UI đời cũ của Microsoft vẫn đưa ra đúng thứ này dưới tên Facepile, vì thế “facepile” mới là cái tên bạn nhớ mang máng; còn Fluent 2 gọi kiểu bố cục chồng gọn là avatar stack. Khi số người nhiều hơn số chỗ, vòng cuối không còn là một gương mặt mà trở thành overflow avatar đếm số người còn lại (+4), và thành viên nào không có ảnh sẽ chuyển sang hiển thị chữ cái đầu tên.",
  "phrases": [
   "những vòng tròn ảnh đại diện chồng lên nhau",
   "danh sách avatar",
   "một đám người",
   "dãy avatar",
   "chồng avatar",
   "hàng gương mặt đè lên nhau"
  ],
  "anatomy": [
   {
    "n": "Avatar stack (the overlap)",
    "sym": "margin-inline-start: -10px",
    "d": "“Chỗ mà từng vòng ảnh đè lên vòng kế tiếp” là avatar stack, tức chính phần chồng lấn: mọi avatar sau cái đầu tiên được kéo lùi bằng margin âm, còn z-index quyết định gương mặt nào nằm trên ở chỗ giao nhau."
   },
   {
    "n": "Separation ring",
    "sym": "border",
    "d": "“Viền mỏng cùng màu nền giúp các bức ảnh không dính vào nhau” là separation ring. Nó được tô bằng màu của bề mặt phía sau cả nhóm (Ant Design đưa ra dưới dạng token groupBorderColor), và nó không phải là focus ring."
   },
   {
    "n": "Fallback initials",
    "sym": "AvatarFallback",
    "d": "“Vòng tròn có màu chứa chữ cái đầu tên khi không có ảnh” là fallback. shadcn/ui gọi là AvatarFallback còn Chakra gọi là Avatar.Fallback; nó chỉ được render khi ảnh bị thiếu hoặc tải lỗi."
   },
   {
    "n": "Overflow avatar (+N)",
    "sym": "AvatarGroupCount",
    "d": "“Vòng cuối ghi +4 thay vì hiện thêm một gương mặt” là overflow avatar. Nó chiếm một chỗ của thành viên và đếm số người không còn chỗ hiển thị, nên nó không phải là badge: MUI sinh nó từ max và total, còn shadcn/ui cung cấp nó dưới tên AvatarGroupCount."
   }
  ],
  "prompt": "Hãy thêm một Avatar Group dùng MUI AvatarGroup: ảnh thành viên hình tròn chồng lên nhau bằng khoảng cách âm gọn, mỗi avatar có một vòng ngăn cách cùng màu nền, thứ tự xếp chồng xác định rõ ràng, chữ cái đầu tên làm fallback cho ảnh bị thiếu, và một avatar +N ở cuối khi còn người bị ẩn.",
  "debug": "Hãy giúp tôi gỡ lỗi avatar group (AvatarGroup, margin-inline-start âm, z-index, overflow +N). Loại trừ lần lượt: margin âm bị áp cả lên phần tử con đầu tiên, khiến cả hàng thò ra khỏi mép trái; số dư tính từ tổng thay vì tổng trừ số đang hiển thị, nên hiện +5 trong khi chỉ bốn người bị ẩn; thứ tự xếp chồng bỏ mặc cho DOM nên avatar cuối đè lên avatar đầu (hãy đặt z-index rõ ràng, hoặc đảo ngược hàng); vòng ngăn cách bị gán cứng màu trắng nên chói trong dark mode thay vì theo màu bề mặt phía sau nhóm; vòng bị cắt vì nhóm nằm trong phần tử cha có overflow hidden; chữ cái đầu tên không bao giờ hiện vì URL ảnh hỏng để lại một <img> rỗng thay vì chuyển sang fallback. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "Material UI",
    "text": "AvatarGroup",
    "note": "quản lý cả nhóm: max, total, renderSurplus, spacing"
   },
   {
    "lang": "shadcn/ui",
    "text": "AvatarGroupCount",
    "note": "mục overflow +N"
   },
   {
    "lang": "CSS",
    "text": "margin-inline-start",
    "note": "giá trị âm chính là thứ làm các vòng tròn chồng lên nhau"
   },
   {
    "lang": "Chakra UI",
    "text": "stacking",
    "note": "quyết định avatar nào được vẽ phía trước avatar bên cạnh"
   },
   {
    "lang": "Ant Design",
    "text": "Avatar.Group",
    "note": "overflow được đặt bằng max={{ count }}; maxCount đã bị deprecated"
   },
   {
    "lang": "Fluent UI React v8",
    "text": "Facepile",
    "note": "tên cũ của Microsoft; Fluent 2 gọi là Avatar group"
   }
  ],
  "see": [
   "web/badge-chip-pill",
   "web/hover-card",
   "web/status-dot",
   "web/chat-bubble"
  ]
 },
 "web/badge-chip-pill": {
  "lead": "Bốn nhãn nhỏ, bốn công việc khác nhau: hãy đặt tên theo công việc nó làm, đừng theo hình dạng.",
  "sym": [
   "Badge",
   "<button>"
  ],
  "aka": [
   "token",
   "lozenge",
   "capsule"
  ],
  "def": "Badge là một con số đếm hay dấu trạng thái rất nhỏ gắn lên một đối tượng khác. Chip là một token nhỏ gọn có thể tương tác: chọn, sửa hoặc xoá được; còn pill chỉ mô tả hình viên thuốc chứ không quy định hành vi chặt chẽ. Tag thường là siêu dữ liệu phân loại không tương tác, vì vậy hãy chọn thuật ngữ theo công việc của nó chứ đừng chỉ dựa vào góc bo tròn.",
  "phrases": [
   "bong bóng số nhỏ trên một icon",
   "nhãn bo tròn có dấu x",
   "nhãn trạng thái hình viên thuốc",
   "nhãn danh mục nhỏ trên thẻ",
   "bong bóng lọc có thể xoá",
   "chấm đỏ nhỏ trên một icon"
  ],
  "anatomy": [
   {
    "n": "Badge anchor",
    "sym": "Badge",
    "d": "“Cái icon mà bong bóng số nhỏ bám lên” là badge anchor."
   },
   {
    "n": "Badge count",
    "sym": "Badge",
    "d": "“Con số bé xíu trong bong bóng đỏ” là badge count."
   },
   {
    "n": "Chip remove button",
    "sym": "<button aria-label>",
    "d": "“Dấu x nhỏ bên trong viên lọc” là nút xoá của chip (chip remove button)."
   },
   {
    "n": "Selected chip state",
    "sym": "aria-pressed",
    "d": "“Viên lọc vẫn được tô đầy sau khi tôi bấm vào” là selected chip state."
   }
  ],
  "prompt": "Dùng Badge cho số lượng chưa đọc gọn nhẹ, dùng Chip có thể đóng cho bộ lọc đang bật, dùng Pill bo tròn hoàn toàn cho chữ trạng thái ngắn, và dùng Tag cho siêu dữ liệu danh mục. Dùng shadcn/ui Badge cho các nhãn không tương tác, và với mọi nút xoá chỉ có icon thì phải đặt aria-label.",
  "debug": "Hãy giúp tôi gỡ lỗi badge/chip/pill. Loại trừ lần lượt: số đếm không giới hạn làm vỡ bố cục thay vì chặn ở 99+; pill bị xuống dòng giữa nhãn do thiếu white-space nowrap; vùng bấm xoá của chip nhỏ hơn nhiều so với 24px nên chạm trượt; màu nền có độ tương phản thấp bị hỏng trong dark mode vì các màu không được đặt theme thành một cặp. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "shadcn/ui",
    "text": "Badge"
   },
   {
    "lang": "HTML",
    "text": "<button>",
    "note": "dùng cho chip có thể xoá hoặc chọn"
   },
   {
    "lang": "ARIA",
    "text": "aria-label"
   }
  ],
  "see": [
   "macos/dock-badge",
   "web/toggle-group",
   "web/switch-checkbox-radio",
   "web/multi-select",
   "web/avatar-group",
   "web/alert-callout-banner",
   "web/status-dot",
   "web/bottom-navigation"
  ]
 },
 "web/bento-grid": {
  "lead": "Ô to duy nhất là một ô trải nhiều cell (grid-column: span 2); khi các ô khác kích thước nằm chung một grid thì đó là bento.",
  "sym": [
   "display: grid + grid-column: span 2",
   "grid-template-columns: repeat(4, 1fr)"
  ],
  "aka": [
   "bento box layout",
   "feature grid",
   "dashboard grid"
  ],
  "def": "“Nhiều hộp trong một lưới, kiểu bento” chính là bento grid: một lưới CSS grid duy nhất, trong đó các ô trải qua số cell khác nhau, nên một ô nổi bật nằm giữa những ô nhỏ như các ngăn trong hộp cơm Nhật. Các trang marketing của Apple đã làm phong cách này nổi tiếng. Dấu hiệu để phân biệt với lưới card thông thường là việc trải ô: có ít nhất một ô chiếm 2×2 hoặc 2×1 cell, trong khi mọi thứ vẫn thẳng hàng theo cùng các track và cùng một khoảng gap.",
  "phrases": [
   "mấy cái hộp trong một lưới, kiểu bento",
   "các hộp kích thước khác nhau trong cùng một lưới",
   "lưới có một hộp to và các hộp nhỏ bao quanh",
   "lưới tính năng kiểu Apple với các card bo tròn",
   "dashboard làm từ những ô to nhỏ khác nhau"
  ],
  "anatomy": [
   {
    "n": "Spanning tile",
    "sym": "grid-column: span 2",
    "d": "“Cái hộp to duy nhất giữa những hộp nhỏ” là spanning tile: một grid item bình thường nhưng được bảo chiếm hai cột và/hoặc hai hàng."
   },
   {
    "n": "Gap (gutter)",
    "sym": "gap",
    "d": "“Khoảng cách đều giữa tất cả các hộp” là gap của lưới: chỉ một giá trị duy nhất, không bao giờ dùng margin riêng cho từng ô, và đó là lý do bento trông như được máy xếp khít."
   }
  ],
  "prompt": "Hãy dựng một bento grid: một lưới CSS grid duy nhất (khai báo display: grid, cột bằng grid-template-columns: repeat(4, 1fr), và một gap nhất quán) trong đó các ô tính năng trải nhiều cell qua grid-column: span 2 và cả grid-row: span 2, mọi ô dùng chung một bán kính bo góc và nền đặc (không trong suốt), để toàn bộ bố cục đọc như một chiếc hộp bo tròn gồm nhiều ngăn kích thước khác nhau.",
  "debug": "Hãy giúp tôi gỡ lỗi bento grid (CSS grid có các ô trải nhiều cell). Loại trừ lần lượt: lưới bị lỗ hổng vì một span vượt quá số cột còn lại trong hàng của nó (cân nhắc grid-auto-flow: dense, lưu ý nó làm thứ tự hiển thị lệch với thứ tự DOM); khoảng cách không đều do dùng margin riêng cho từng ô thay vì một gap duy nhất của grid; các ô có bán kính bo góc khác nhau hoặc nền trong suốt phá vỡ vẻ ngoài kiểu hộp cơm; ô nổi bật bị co hỏng trên màn hình nhỏ vì span không được giảm bớt trong media query. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "CSS",
    "text": "display: grid + grid-column: span 2",
    "note": "các cell được trải ra chính là thứ biến một lưới thành bento"
   },
   {
    "lang": "CSS",
    "text": "grid-template-columns: repeat(4, 1fr)",
    "note": "bộ khung track cố định để các span phát huy trên đó"
   },
   {
    "lang": "CSS",
    "text": "grid-template-areas",
    "note": "đặt tên cho từng ô thay vì phải đếm span"
   },
   {
    "lang": "Tailwind",
    "text": "col-span-2 row-span-2"
   }
  ],
  "see": [
   "web/masonry",
   "web/drag-and-drop",
   "web/card",
   "web/data-table",
   "web/pie-donut-chart",
   "web/waffle-menu"
  ]
 },
 "web/bottom-navigation": {
  "lead": "Bấm vào Search. Hàng icon nổi ở dưới cùng đó là tab bar.",
  "sym": [
   "UITabBar",
   "TabView"
  ],
  "aka": [
   "tab bar",
   "bottom tab bar",
   "bottom nav",
   "bottom tabs",
   "bottom navigation bar",
   "navigation bar (Material 3)",
   "mobile nav bar"
  ],
  "def": "“Cái thanh kiểu kính ở đáy các app iOS có chừng 4 hay 5 lựa chọn” là tab bar trên iOS (UITabBar, SwiftUI TabView) và là navigation bar trong Material 3 (Compose NavigationBar); dân web và React Native thì hay nói bottom navigation hoặc bottom tabs. Đó là một hàng cố định gồm ba đến năm điểm đến, mỗi điểm là một icon kèm nhãn ngắn; chạm vào một mục sẽ đổi toàn bộ màn hình phía trên trong khi thanh vẫn đứng yên. Luôn có một tab đang được chọn và được nhuộm màu, và tab nào cũng có thể mang một badge. Nó không phải bottom sheet (một panel trượt lên che màn hình), không phải toolbar (các thao tác cho màn hình hiện tại chứ không phải nơi để đi tới), và cũng không phải Tabs của web, thứ chỉ chuyển một vùng bên trong trang.",
  "phrases": [
   "menu dưới cùng để đi tới các phần khác nhau",
   "thanh kiểu kính ở đáy app iOS trên điện thoại có chừng 4 hay 5 lựa chọn nhỏ trong app",
   "thanh menu dưới cùng của app di động",
   "thanh dưới đáy trong các app iPhone",
   "bộ điều hướng tab ở dưới",
   "tab thanh thấp",
   "thanh trạng thái ở dưới cùng"
  ],
  "anatomy": [
   {
    "n": "Tab bar",
    "sym": "UITabBar",
    "d": "“Cái thứ kiểu kính ở dưới cùng” chính là tab bar (Material 3 gọi là navigation bar): dải cố định chứa mọi điểm đến, nổi và hơi trong suốt trên iOS 26."
   },
   {
    "n": "Tab item",
    "sym": "Tab",
    "d": "“Một trong các icon có chữ bên dưới” là tab item (Compose: NavigationBarItem; UIKit: UITabBarItem): một điểm đến, icon nằm trên nhãn."
   },
   {
    "n": "Selected tab",
    "sym": "tabBarActiveTintColor",
    "d": "“Cái được tô màu” là selected tab: đúng một mục nhận màu nhấn, những mục còn lại giữ màu nhạt."
   },
   {
    "n": "Count badge",
    "sym": "tabBarBadge",
    "d": "“Con số đỏ ở góc một icon” là count badge (với React Navigation thì prop tên tabBarBadge, còn với SwiftUI thì .badge(_:)): cho biết có bao nhiêu thứ đang chờ trong mục đó. Nếu bên trong không có số thì nó là dot badge."
   },
   {
    "n": "Safe-area inset",
    "sym": "env(safe-area-inset-bottom)",
    "d": "“Dải trống bên dưới các icon” là safe-area inset: phần đệm giữ các tab tránh khỏi vạch vuốt lên của iPhone, tức home indicator."
   }
  ],
  "prompt": "Hãy dựng một bottom navigation bar (tab bar của iOS: UITabBar / SwiftUI TabView; NavigationBar của Material 3) cố định ở đáy màn hình, gồm bốn điểm đến có tầm quan trọng ngang nhau, mỗi điểm là một icon nằm trên nhãn ngắn. Nhuộm màu tab đang chọn và để các tab khác nhạt, hiện một count badge trên Inbox (tabBarBadge / .badge(_:)), và đổi màn hình phía trên mà không có animation push. Trên web, làm nó thành một <nav> chứa các link, đặt aria-current=\"page\" cho link đang active, và đệm thanh bằng env(safe-area-inset-bottom) để các icon không bị home indicator của iPhone che.",
  "debug": "Hãy giúp tôi gỡ lỗi bottom navigation / tab bar (các thành phần liên quan: UITabBar, rồi SwiftUI TabView cùng Tab, rồi NavigationBar của Compose, rồi createBottomTabNavigator của React Navigation, và env(safe-area-inset-bottom)). Loại trừ lần lượt: icon nằm dưới home indicator của iPhone vì env(safe-area-inset-bottom) trả về 0 khi thẻ meta viewport thiếu viewport-fit=cover; thanh trên web đặt bằng bottom: 0 trong một trang 100vh nên bị trốn sau thanh công cụ của trình duyệt di động (dùng dvh hoặc position: fixed theo viewport); nội dung trang cuộn chui xuống dưới mà không có padding đáy bằng chiều cao thanh cộng với inset; có hơn năm điểm đến nên nhãn bị cắt hoặc iOS gom phần còn lại vào một tab More; màu chọn chỉ áp lên icon mà không áp lên nhãn; tab đang active chỉ được đánh dấu bằng màu, không có aria-current=\"page\" hay selected trait; tab bị dùng cho hành động (soạn, quét) thay vì điểm đến, nên chạm vào mà không dẫn đi đâu; mọi tab bị mount lại và mất vị trí cuộn vì mỗi lần chuyển đều dựng lại màn hình; bàn phím đẩy thanh lên đè lên form; badge bị cắt bởi overflow hidden ở phần bao quanh icon. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "UIKit",
    "text": "UITabBar",
    "note": "iOS gọi nó là tab bar; UITabBarController quản lý nó và đổi màn hình phía trên"
   },
   {
    "lang": "SwiftUI",
    "text": "TabView",
    "note": "mỗi phần là một Tab (iOS 18+); .badge(_:) gắn số đếm lên một tab"
   },
   {
    "lang": "Jetpack Compose",
    "text": "NavigationBar",
    "note": "tên của Material 3 cho thành phần này; mỗi icon là một NavigationBarItem, từ ba đến năm điểm đến"
   },
   {
    "lang": "React Navigation",
    "text": "createBottomTabNavigator()",
    "note": "theo từng màn hình: tabBarIcon, tabBarLabel, tabBarBadge, tabBarActiveTintColor"
   },
   {
    "lang": "SwiftUI",
    "text": "tabBarMinimizeBehavior(_:)",
    "note": "iOS 26: thanh kính nổi co nhỏ lại khi bạn cuộn"
   },
   {
    "lang": "ARIA",
    "text": "aria-current=\"page\"",
    "note": "trên web đó là một <nav> chứa các link, phần bạn đang ở được đánh dấu là hiện tại"
   },
   {
    "lang": "CSS",
    "text": "env(safe-area-inset-bottom)",
    "note": "phần đệm nâng các icon khỏi home indicator của iPhone; cần viewport-fit=cover"
   }
  ],
  "see": [
   "web/tabs",
   "web/header-navbar",
   "web/hamburger-menu",
   "web/dialog-drawer-sheet",
   "web/badge-chip-pill",
   "web/floating-buttons"
  ]
 },
 "web/breadcrumbs": {
  "lead": "Dải đường dẫn trở về trang chủ; dấu ⋯ đại diện cho phần giữa đã bị thu gọn của một đường dẫn sâu.",
  "sym": [
   "<nav>",
   "aria-label=\"Breadcrumb\""
  ],
  "aka": [
   "breadcrumb trail",
   "path navigation",
   "hierarchy trail"
  ],
  "def": "Breadcrumbs cho thấy trang hiện tại nằm ở đâu trong một cây phân cấp và cung cấp link đi thẳng về các cấp cha của nó. Mục cuối cùng là vị trí hiện tại nên không phải link, và các dấu phân cách chỉ mang tính trang trí. Với đường dẫn sâu, các cấp ở giữa có thể được gộp vào dấu chấm lửng, nhưng không được ẩn gốc hay trang hiện tại.",
  "phrases": [
   "các link kiểu trang chủ gạch chéo mục gạch chéo trang hiện tại",
   "dải đường dẫn phía trên tiêu đề trang",
   "các link cho biết bạn đang ở đâu trong site",
   "điều hướng kiểu đường dẫn thư mục",
   "hàng có dấu chevron giữa các tên trang"
  ],
  "anatomy": [
   {
    "n": "Breadcrumb separator",
    "sym": "aria-hidden=\"true\"",
    "d": "“Dấu gạch chéo hoặc chevron nhỏ giữa các tên trang” là breadcrumb separator."
   },
   {
    "n": "Current-page crumb",
    "sym": "aria-current=\"page\"",
    "d": "“Tên trang cuối cùng, không phải link” là current-page crumb."
   },
   {
    "n": "Collapsed ancestors",
    "sym": "BreadcrumbEllipsis",
    "d": "“Ba chấm che phần giữa của đường dẫn” là collapsed ancestors."
   }
  ],
  "prompt": "Hãy thêm breadcrumbs bên trong <nav aria-label=\"Breadcrumb\">, gắn link cho từng cấp cha và đánh dấu mục cuối bằng aria-current=\"page\". Khi thiếu chỗ, gộp các cấp cha ở giữa ít giá trị vào dấu chấm lửng, nhưng vẫn giữ trang hiện tại hiển thị.",
  "debug": "Hãy giúp tôi gỡ lỗi breadcrumbs, cụ thể là thẻ nav có aria-label=breadcrumb và thuộc tính aria-current=page. Loại trừ lần lượt: dấu phân cách bị gõ thẳng vào markup nên trình đọc màn hình đọc to từng dấu gạch chéo (hãy vẽ chúng bằng pseudo-element của CSS); mục cuối thiếu aria-current; đường dẫn dài cần gộp các mục giữa thay vì xuống thành hai dòng; trang hiện tại bị render thành link trỏ về chính nó. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "HTML",
    "text": "<nav>"
   },
   {
    "lang": "ARIA",
    "text": "aria-label=\"Breadcrumb\""
   },
   {
    "lang": "ARIA",
    "text": "aria-current=\"page\""
   },
   {
    "lang": "shadcn/ui",
    "text": "Breadcrumb"
   }
  ],
  "see": [
   "macos/sidebar",
   "web/tabs",
   "macos/toolbar",
   "web/header-navbar",
   "web/steps",
   "web/scrollspy"
  ]
 },
 "web/card": {
  "lead": "Hàng nút ở dưới cùng là footer; khoảng trống dồn lên phía trên nó chính là cái “chin” (cằm).",
  "sym": [
   "<Card>",
   "<article>"
  ],
  "aka": [
   "tile",
   "card component",
   "content card",
   "status card"
  ],
  "def": "“Những cái hộp trên dashboard” là các card, và mỗi vùng trong một card đều có tên: phần media ở trên cùng, header chứa tiêu đề, body, hàng metadata, và footer chứa các hành động. Câu “mấy cái card này có cái cằm to quá” nói về khoảng trống thừa phía trên footer; đó không phải một bộ phận mà là lỗi kích thước: khi grid kéo các card cho cao bằng nhau, footer không được ghim sẽ để khoảng trống dồn xuống chỗ đó (margin-top: auto sửa được). Đừng nhầm với bản xem trước dạng popup hiện ra trên một link, thứ đó là hover card.",
  "phrases": [
   "các card trạng thái",
   "card điểm số",
   "cấu trúc của một card công việc",
   "mấy cái card này có cái cằm to quá",
   "cái hộp có ảnh ở trên và chữ ở dưới",
   "các ô trên dashboard"
  ],
  "anatomy": [
   {
    "n": "Card media",
    "sym": "usa-card__media",
    "d": "“Bức ảnh phủ kín phần trên của card” là card media: một slot ảnh tràn sát mép card và dùng chung bán kính bo góc phía trên với card."
   },
   {
    "n": "Card header",
    "sym": "CardHeader / CardTitle",
    "d": "“Dòng tiêu đề in đậm bên trong hộp” là card header: phần tiêu đề, thường có một nhãn eyebrow nhỏ nằm phía trên."
   },
   {
    "n": "Card body",
    "sym": "CardContent",
    "d": "“Đoạn mô tả dưới tiêu đề” là card body: slot nội dung chính nằm giữa header và footer."
   },
   {
    "n": "Metadata row",
    "sym": "<time> + CardDescription",
    "d": "“Dòng chữ xám nhỏ có ngày và tác giả” là metadata row: dòng chi tiết phụ màu nhạt, thường kèm avatar, ngày hoặc thời gian đọc."
   },
   {
    "n": "Card footer",
    "sym": "CardFooter",
    "d": "“Vùng chứa nút ở dưới cùng” là card footer: hàng hành động. Khoảng trống dồn lên phía trên nó trong các grid có chiều cao bằng nhau chính là “chin”; hãy ghim footer bằng margin-top: auto."
   }
  ],
  "prompt": "Hãy dựng một component card: một <article> (hoặc <Card> của shadcn/ui) có nền đặc, một bán kính bo góc duy nhất và các slot xếp chồng gồm ảnh media, header chứa tiêu đề, văn bản body, một hàng metadata và một footer chứa các hành động. Cho card là display:flex theo cột và đặt margin-top:auto cho footer, để các card cao bằng nhau trong grid không bao giờ sinh khoảng trống thừa phía trên footer.",
  "debug": "Hãy giúp tôi gỡ lỗi component card (shadcn/ui Card / .card / <article>). Loại trừ lần lượt: “cái cằm to” tức khoảng trống thừa phía trên footer, do grid/flex kéo các card cho cao bằng nhau trong khi footer của card dạng flex-column chưa được ghim bằng margin-top:auto; góc của media thò ra ngoài vì ảnh bỏ qua border-radius của card (dùng overflow:hidden hoặc cho ảnh cùng bán kính); cả card bị bọc trong <a> trong khi bên trong còn các link lồng nhau (HTML không hợp lệ); chữ dính sát media vì padding đặt nhầm slot. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "shadcn/ui",
    "text": "<Card>",
    "note": "kèm các slot CardHeader / CardContent / CardFooter"
   },
   {
    "lang": "HTML",
    "text": "<article>",
    "note": "phần bao ngữ nghĩa khi card đứng độc lập"
   },
   {
    "lang": "CSS",
    "text": "margin-top: auto",
    "note": "đặt trên footer; đây là cách sửa cho chiều cao card không đều"
   },
   {
    "lang": "Bootstrap",
    "text": ".card"
   }
  ],
  "see": [
   "web/bento-grid",
   "web/masonry",
   "web/hover-card",
   "web/skeleton-spinner",
   "web/timeline",
   "web/hover-effects"
  ]
 },
 "web/carousel": {
  "lead": "Bấm các mũi tên hoặc một chấm; hàng chấm nhỏ là bộ chọn slide.",
  "sym": [
   "aria-roledescription=\"carousel\"",
   "scroll-snap-type: x mandatory"
  ],
  "aka": [
   "slider",
   "content slider",
   "slideshow",
   "image slider",
   "swiper"
  ],
  "def": "“Thứ trượt card / card trượt kiểu carousel” là một carousel: một dải các slide mà bạn lật qua bằng nút mũi tên hoặc các chấm nhỏ; chính thức thì các chấm này gọi là slide picker controls. Nếu dải tự cuộn trong vòng lặp bất tận thì đó là marquee, còn nếu bấm vào ảnh thu nhỏ mà ảnh mở to phủ lên trang tối đi thì đó là lightbox; carousel thì đứng yên tại chỗ và mỗi lần chỉ cho xem một slide.",
  "phrases": [
   "cái trượt card",
   "thứ carousel trượt",
   "cái trượt ảnh có mấy chấm nhỏ",
   "banner tự đổi ảnh",
   "ba bức ảnh xoay vòng mà bạn có thể chuyển bằng tay",
   "slideshow bạn vuốt ngang qua",
   "một bộ card cuộn theo chiều ngang"
  ],
  "anatomy": [
   {
    "n": "Slide",
    "sym": "aria-roledescription=\"slide\"",
    "d": "“Mỗi tấm card mà bạn vuốt qua lại” là một slide: một panel của track, mang role=\"group\" và vị trí của nó (“2 of 3”) được đọc ra cho người dùng trình đọc màn hình."
   },
   {
    "n": "Previous / next controls",
    "sym": "button aria-label=\"Next slide\"",
    "d": "“Các mũi tên hai bên” là previous/next controls: những button thật, mỗi lần lật track đúng một slide."
   },
   {
    "n": "Slide picker (the dots)",
    "sym": "role=\"tablist\"",
    "d": "“Những chấm nhỏ dưới slideshow” là slide picker controls: mỗi slide một button, chấm được tô đầy đánh dấu slide hiện tại; W3C cài chúng dưới dạng một tab list."
   }
  ],
  "prompt": "Hãy dựng một carousel (content slider): một track nằm ngang chứa các slide, lật từng slide một bằng nút previous/next và các chấm slide picker, dùng scroll-snap-type: x mandatory hoặc embla-carousel-react (thư viện mà Carousel của shadcn/ui bọc lại). Bọc nó trong role=\"region\" aria-roledescription=\"carousel\"; mỗi slide là role=\"group\" aria-roledescription=\"slide\" kèm nhãn vị trí kiểu \"2 of 3\". Không tự xoay vòng trừ khi có nút tạm dừng nhìn thấy được.",
  "debug": "Hãy giúp tôi gỡ lỗi carousel (dùng embla-carousel-react, hoặc swiper, hoặc CSS scroll-snap). Loại trừ lần lượt: các slide tràn ra ngoài vì track không phải display:flex với các slide flex: 0 0 100%; scroll-snap đánh nhau với transform do JS điều khiển (chỉ chọn MỘT cơ chế); các chấm lệch pha vì chỉ số được chọn lắng nghe nhầm sự kiện; tự xoay vòng vẫn chạy khi người dùng bật prefers-reduced-motion hoặc khi không có nút tạm dừng; vuốt không ăn vì touch-action hoặc pointer-events bị chặn trên track. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "ARIA",
    "text": "aria-roledescription=\"carousel\"",
    "note": "đặt trên phần bao role=\"region\"; đây là tên gọi của W3C cho mẫu thiết kế này"
   },
   {
    "lang": "CSS",
    "text": "scroll-snap-type: x mandatory",
    "note": "track hiện đại, không cần JS"
   },
   {
    "lang": "React",
    "text": "embla-carousel-react",
    "note": "thư viện mà <Carousel> của shadcn/ui bọc lại"
   },
   {
    "lang": "JS",
    "text": "swiper",
    "note": "thư viện lâu đời đã làm mẫu thiết kế này phổ biến"
   }
  ],
  "see": [
   "web/marquee",
   "web/lightbox",
   "web/tabs",
   "web/pagination"
  ]
 },
 "web/cascading-menus": {
  "lead": "Bấm vào một hàng có mũi tên: cấp kế tiếp mở ra ngay bên cạnh, trong một cột mới, hoặc dưới một hàng quay lại.",
  "sym": [
   "aria-haspopup=\"menu\"",
   "DropdownMenu.Sub"
  ],
  "aka": [
   "cascading menu",
   "flyout menu",
   "nested menu",
   "multi-level menu",
   "cascade select",
   "sliding menu"
  ],
  "def": "“Một mục menu có mũi tên mở ra menu thứ hai” là một submenu (Radix DropdownMenu.Sub): trỏ vào hàng có chevron ở đầu bên phải sẽ mở menu kế tiếp ngay cạnh nó. Cascader (Ant Design Cascader) làm điều tương tự bên trong một ô nhập của form, mỗi lần chọn lại thêm một cột, và khi đóng lại thì ô hiển thị cả đường dẫn đã chọn, kiểu “Europe / France / Paris”. Drill-down menu thì khác: nó thay danh sách ngay tại chỗ, kèm một hàng quay lại ở trên cùng, đúng như các menu trên điện thoại. Các cột cỡ cửa sổ của Finder là Column View; còn bộ dựng bộ lọc hay cặp select chọn quốc gia rồi tới bang là những control khác hẳn.",
  "phrases": [
   "một mục menu có mũi tên mở ra menu thứ hai ngay bên cạnh",
   "trong dropdown có mũi tên ở bên phải, bấm vào thì hiện dropdown của mục đó",
   "các danh sách đặt cạnh nhau trong một dropdown, mỗi lần chọn lại mở danh sách tiếp theo",
   "ô hiển thị mọi cấp mình đã chọn, ngăn cách bằng dấu gạch chéo",
   "menu điện thoại, chạm vào một mục thì danh sách tiếp theo trượt vào với nút quay lại ở trên",
   "chọn châu lục, rồi quốc gia, rồi thành phố từ cùng một dropdown"
  ],
  "anatomy": [
   {
    "n": "Submenu indicator (chevron)",
    "sym": "aria-haspopup=\"menu\"",
    "d": "“Mũi tên bên phải trong dropdown” là submenu indicator, và hàng của nó vẫn được làm nổi bật trong lúc submenu đang mở."
   },
   {
    "n": "Submenu panel",
    "sym": "DropdownMenu.SubContent",
    "d": "“Menu thứ hai bật ra bên cạnh” là submenu panel; nó căn thẳng hàng với hàng đã mở nó và vẫn mở trong lúc con trỏ băng sang đó."
   },
   {
    "n": "Path in the field",
    "sym": "displayRender",
    "d": "“Cái ô hiển thị mọi cấp tôi đã chọn” là giá trị đường dẫn của cascader, các cấp được ngăn cách bằng “ / ”."
   },
   {
    "n": "Cascade column",
    "sym": "options[].children",
    "d": "“Danh sách kế tiếp hiện ra bên phải” là một cascade column, mỗi cấp một cột, và mục đã chọn trong mỗi cột được nhuộm màu."
   },
   {
    "n": "Back row",
    "sym": ".js-drilldown-back",
    "d": "“Hàng trên cùng đưa bạn quay lại” là back row: một chevron hướng trái cùng tên danh sách bạn đang ở, nằm phía trên các mục đã drill vào."
   }
  ],
  "prompt": "Hãy dựng loại menu nhiều cấp phù hợp với việc cần làm: một submenu (Radix DropdownMenu.Sub) có hàng kết thúc bằng chevron và mở menu kế tiếp ngay bên cạnh; hoặc một cascader (Ant Design Cascader) với mỗi cấp một cột và đường dẫn đã chọn hiện trong ô đã đóng dưới dạng \"A / B / C\"; hoặc, trên điện thoại, một drill-down trượt cấp kế tiếp vào bên dưới một hàng quay lại. Với điều hướng của website thì dùng các nút disclosure, không dùng role=\"menu\".",
  "debug": "Hãy giúp tôi gỡ lỗi menu nhiều cấp (Radix DropdownMenu.Sub, Ant Design Cascader, hoặc một drawer drill-down). Loại trừ lần lượt: submenu đóng sập khi con trỏ cắt chéo qua một hàng khác trên đường đi sang nó; submenu bị cắt bởi phần tử cha có overflow: hidden thay vì được render trong portal; submenu mở ra tràn mép phải màn hình mà không lật sang trái; kiểu mở chỉ bằng hover nên không bao giờ chạy trên cảm ứng; phím Right Arrow không chuyển focus vào submenu; cascader mất các cột phía sau khi chọn lại một mục cha; các cấp drill-down đang ẩn vẫn nhận focus được; hiệu ứng trượt vẫn chạy khi bật prefers-reduced-motion. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "ARIA",
    "text": "aria-haspopup=\"menu\"",
    "note": "đặt trên hàng mở ra một submenu"
   },
   {
    "lang": "Radix",
    "text": "DropdownMenu.Sub",
    "note": "đi kèm SubTrigger và SubContent"
   },
   {
    "lang": "shadcn/ui",
    "text": "<DropdownMenuSub>"
   },
   {
    "lang": "Ant Design",
    "text": "<Cascader options={…} />",
    "note": "mỗi cấp một cột; ô hiển thị đường dẫn đã chọn"
   },
   {
    "lang": "Foundation",
    "text": "data-drilldown",
    "note": "drill-down trượt vào; chưa có bản phát hành nào từ năm 2024"
   }
  ],
  "see": [
   "macos/context-menu",
   "web/popover-dropdown-tooltip",
   "macos/column-view",
   "web/hamburger-menu"
  ]
 },
 "web/chat-bubble": {
  "lead": "Bấm vào tin nhắn màu xanh của bạn để đánh dấu đã đọc. Mỗi hộp bo tròn bao quanh một tin nhắn là một chat bubble.",
  "sym": [
   "chat-bubble",
   "role=\"log\""
  ],
  "aka": [
   "message bubble",
   "speech bubble",
   "chat message",
   "text bubble",
   "conversation bubble",
   "messenger bubble"
  ],
  "def": "“Los bocadillos” (tiếng Tây Ban Nha, nghĩa là những bong bóng thoại hiện trong một cuộc trò chuyện) là các chat bubble, còn gọi là message bubble: mỗi tin nhắn một hộp bo tròn, tin của người kia nằm một bên với màu trung tính, tin của bạn nằm bên còn lại với màu nhấn. Góc nhọn nhỏ là tail (cái đuôi), dòng bên dưới chứa dấu thời gian cùng trạng thái đã gửi hoặc đã đọc, và bong bóng có ba chấm nảy lên là typing indicator. Cẩn thận với hai thứ trông giống: bong bóng chỉ vào một nút để giải thích là tooltip hoặc popover chứ không phải chat bubble, và ba chấm mở ra một menu là overflow menu chứ không phải typing indicator.",
  "phrases": [
   "những bong bóng thoại hiện ra trong cuộc trò chuyện (tiếng Tây Ban Nha)",
   "bong bóng thoại (tiếng Nhật)",
   "bong bóng chat",
   "bong bóng chat (viết sai chính tả)",
   "danh sách các bong bóng",
   "chữ phản hồi trong một khung chat",
   "dấu hiệu đang gõ"
  ],
  "anatomy": [
   {
    "n": "Message bubble",
    "sym": "chat-bubble",
    "d": "“Cái hộp bo tròn bao quanh mỗi đoạn chữ” là message bubble: tin nhận được nằm phía đầu với nền trung tính, tin đã gửi nằm phía cuối với màu nhấn."
   },
   {
    "n": "Bubble tail",
    "sym": "",
    "d": "“Góc nhọn nhỏ trên bong bóng” là tail: nó chỉ về phía người đang nói, và chỉ bong bóng cuối cùng trong một chuỗi mới giữ nó."
   },
   {
    "n": "Message status",
    "sym": "<MessageStatus />",
    "d": "“Chữ Delivered hoặc Read bé xíu dưới tin của tôi” là message status (read receipt), nằm trong dòng metadata cạnh dấu thời gian."
   },
   {
    "n": "Typing indicator",
    "sym": "<TypingIndicator />",
    "d": "“Ba chấm nảy lên khi ai đó đang gõ” là một typing indicator: một bong bóng kiểu tin nhận được, bên trong chứa các chấm chuyển động thay vì chữ."
   }
  ],
  "prompt": "Hãy dựng cuộc hội thoại như một danh sách tin nhắn có role=\"log\", mỗi tin nhắn một chat bubble (daisyUI chat + chat-bubble): tin nhận được căn về phía đầu với nền trung tính (chat-start), tin đã gửi căn về phía cuối với màu nhấn (chat-end). Cho mỗi bong bóng bán kính bo góc khá lớn, riêng một góc chặt hơn ở phía người nói để làm tail, giới hạn chiều rộng khoảng 75% cột để tin dài tự xuống dòng, và đặt một dòng metadata nhỏ dưới tin mới nhất của bạn gồm giờ và trạng thái đã gửi hoặc đã đọc (MessageStatus của Stream Chat). Khi người kia đang soạn tin, hiện một typing indicator: bong bóng kiểu tin nhận được chứa ba chấm nảy lần lượt nối tiếp nhau.",
  "debug": "Hãy giúp tôi gỡ lỗi các chat bubble / danh sách tin nhắn (các class daisyUI gồm chat-start, rồi chat-end, rồi chat-bubble; thêm role=\"log\"; Stream Chat với MessageStatus, MessageTimestamp, TypingIndicator). Loại trừ lần lượt: bong bóng giãn hết chiều rộng cột vì hàng là block chứ không phải flex row có max-width đặt trên bong bóng; một URL dài hoặc chuỗi không ngắt tràn khỏi bong bóng do thiếu overflow-wrap: anywhere; tin gửi và tin nhận chỉ phân biệt bằng màu, không có căn lề hay nhãn truy cập nào nói ai là người nói; cái tail vẽ thành một tam giác riêng bị rời khỏi bong bóng hoặc lộ đường nối trong dark mode; mọi tin liên tiếp đều lặp lại avatar, tên và tail thay vì chỉ tin cuối nhóm; danh sách không bám vào tin mới nhất, hoặc kéo người đọc về cuối trong lúc họ đang cuộn ngược lên xem lịch sử; role=\"log\" hay aria-live đặt trên từng bong bóng thay vì một lần trên cả danh sách, nên trình đọc màn hình đọc lại mọi thứ; typing indicator vẫn bật sau khi tin đã tới, hoặc vẫn chuyển động khi đã đặt prefers-reduced-motion; trạng thái đã đọc bị hiện trên tin của người kia; dấu thời gian là chữ trần không có <time datetime>. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "daisyUI",
    "text": "chat-bubble",
    "note": "nằm trong một hàng chat; chat-start đặt nó ở phía của họ, chat-end ở phía của bạn"
   },
   {
    "lang": "ARIA",
    "text": "role=\"log\"",
    "note": "đặt trên danh sách tin nhắn, không phải trên bong bóng: tin mới được đọc ra nhẹ nhàng, đúng thứ tự"
   },
   {
    "lang": "daisyUI",
    "text": "chat-header",
    "note": "tên người gửi phía trên bong bóng; chat-footer là dòng bên dưới nó, chat-image là avatar"
   },
   {
    "lang": "Stream Chat",
    "text": "<MessageStatus />",
    "note": "trạng thái đã gửi, đã nhận và đã đọc dưới tin nhắn của chính bạn"
   },
   {
    "lang": "Stream Chat",
    "text": "<TypingIndicator />",
    "note": "cho biết ai đang gõ ngay lúc này; đa số app vẽ nó thành ba chấm chuyển động trong một bong bóng"
   },
   {
    "lang": "Stream Chat",
    "text": "<MessageTimestamp />",
    "note": "giờ gửi, nằm trong dòng metadata của tin nhắn"
   }
  ],
  "see": [
   "web/popover-dropdown-tooltip",
   "web/three-dots",
   "web/status-dot",
   "web/toast",
   "web/avatar-group",
   "web/floating-buttons"
  ]
 },
 "web/combobox": {
  "lead": "Gõ để lọc; danh sách kết quả khớp dưới ô nhập là listbox popup.",
  "sym": [
   "role=\"combobox\"",
   "role=\"listbox\""
  ],
  "aka": [
   "autocomplete",
   "typeahead",
   "search select",
   "editable dropdown"
  ],
  "def": "Combobox kết hợp một ô văn bản có thể sửa với một danh sách popup các giá trị phù hợp. Gõ tới đâu thì lựa chọn thu hẹp tới đó, phím mũi tên dời option đang active còn Enter chốt lựa chọn. Khác với select thường, nó hỗ trợ tìm kiếm hoặc nhập tự do tuỳ theo quy tắc của sản phẩm.",
  "phrases": [
   "ô nhập xổ xuống (tiếng Trung)",
   "ô nhập gợi ý các lựa chọn trong lúc bạn gõ",
   "một ô dropdown có thể tìm kiếm",
   "hộp văn bản có kết quả khớp ngay bên dưới",
   "một select mà bạn gõ để lọc được",
   "ô địa chỉ tự động hoàn thành",
   "dropdown dự đoán"
  ],
  "anatomy": [
   {
    "n": "Combobox input",
    "sym": "role=\"combobox\"",
    "d": "“Ô dropdown có thể tìm kiếm mà tôi gõ vào” là combobox input."
   },
   {
    "n": "Listbox popup",
    "sym": "role=\"listbox\"",
    "d": "“Các kết quả khớp bên dưới ô nhập” là listbox popup."
   },
   {
    "n": "Active option",
    "sym": "aria-activedescendant",
    "d": "“Kết quả được tô sáng khi tôi bấm phím mũi tên” là active option."
   },
   {
    "n": "Selected-option checkmark",
    "sym": "aria-selected",
    "d": "“Dấu tick cạnh lựa chọn tôi đã chọn rồi” là selected-option indicator."
   }
  ],
  "prompt": "Hãy dựng một Combobox có nhãn, với role=\"combobox\" và một popup role=\"listbox\" được điều khiển. Giữ aria-expanded và aria-controls luôn đồng bộ, gán role=\"option\" cho từng kết quả, giữ focus DOM trong ô nhập bằng aria-activedescendant, và hỗ trợ phím mũi tên, Enter và Escape mà không autofocus khi mount.",
  "debug": "Hãy giúp tôi gỡ lỗi combobox (thuộc tính role=combobox, kèm aria-activedescendant, dùng thư viện cmdk hoặc Radix). Loại trừ lần lượt: listbox đóng lại do blur trước khi cú nhấp vào option kịp tới nơi (xử lý việc chọn ở pointerdown hoặc kiểm tra relatedTarget); chỉ số đang được tô sáng không reset khi bộ lọc thay đổi; aria-activedescendant trỏ vào id của một option đã bị lọc mất; bàn phím trên điện thoại che mất danh sách vì không có gì cuộn ô nhập vào vùng nhìn thấy. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "ARIA",
    "text": "role=\"combobox\""
   },
   {
    "lang": "ARIA",
    "text": "role=\"listbox\""
   },
   {
    "lang": "ARIA",
    "text": "aria-expanded"
   },
   {
    "lang": "ARIA",
    "text": "aria-controls"
   },
   {
    "lang": "ARIA",
    "text": "aria-activedescendant"
   },
   {
    "lang": "HTML",
    "text": "<datalist>",
    "note": "giải pháp thay thế có sẵn nhưng hạn chế"
   }
  ],
  "see": [
   "web/command-palette",
   "macos/popup-pulldown-combo",
   "web/popover-dropdown-tooltip",
   "web/date-picker",
   "web/multi-select"
  ]
 },
 "web/command-palette": {
  "lead": "Mọi hành động đều tìm được trong một ô; phím ↵ chạy lệnh đang được tô sáng.",
  "sym": [
   "Command",
   "role=\"dialog\""
  ],
  "aka": [
   "command menu",
   "quick actions",
   "launcher",
   "command bar"
  ],
  "def": "Command palette là một lớp phủ ưu tiên bàn phím, cho tìm hành động, trang và đối tượng ngay từ một chỗ. Nó thường mở bằng ⌘K hoặc Ctrl+K, tô sáng từng kết quả một, và chạy lệnh đang chọn khi nhấn Enter. Phạm vi của nó rộng hơn combobox, vì nó khởi chạy các lệnh thuộc nhiều loại khác nhau chứ không phải chọn một giá trị cho một ô.",
  "phrases": [
   "menu command k",
   "danh sách các hành động của app có thể tìm kiếm",
   "trình khởi chạy nhanh ở giữa màn hình",
   "popup bàn phím để nhảy tới bất kỳ đâu",
   "ô tìm lệnh kiểu VSCode",
   "popup cmd k"
  ],
  "anatomy": [
   {
    "n": "Command input",
    "sym": "CommandInput",
    "d": "“Ô tìm kiếm ở đầu menu ⌘K” là command input."
   },
   {
    "n": "Command group",
    "sym": "CommandGroup",
    "d": "“Phần có nhãn gom các hành động tương tự” là một command group."
   },
   {
    "n": "Active command",
    "sym": "CommandItem",
    "d": "“Kết quả đang được tô sáng mà Enter sẽ chạy” là active command."
   },
   {
    "n": "Command shortcut",
    "sym": "CommandShortcut",
    "d": "“Các ký tự ⌘ căn phải bên cạnh một hành động” là command shortcut."
   }
  ],
  "prompt": "Hãy thêm một Command Palette dùng component Command của shadcn/ui đặt bên trong một role=\"dialog\", mở bằng ⌘K hoặc Ctrl+K. Lọc các hành động khi người dùng gõ, hỗ trợ chọn bằng phím mũi tên và Enter, và trả focus về control đã gọi nó khi đóng.",
  "debug": "Hãy giúp tôi gỡ lỗi command palette (cmdk, Dialog + Command). Loại trừ lần lượt: listener phím cmd/ctrl-K gắn sai phạm vi hoặc bị trình duyệt nuốt mất; trạng thái bộ lọc còn sót từ lần mở trước (hãy reset khi mở); focus thoát khỏi dialog vì focus trap bỏ qua nội dung render qua portal; keydown bắn ra trong lúc đang soạn IME (hãy kiểm tra isComposing); palette bị render dưới một stacking context cao hơn. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "shadcn/ui",
    "text": "Command"
   },
   {
    "lang": "ARIA",
    "text": "role=\"dialog\""
   },
   {
    "lang": "ARIA",
    "text": "role=\"combobox\""
   },
   {
    "lang": "Radix",
    "text": "Dialog"
   }
  ],
  "see": [
   "web/combobox",
   "web/dialog-drawer-sheet",
   "web/focus-ring-web",
   "macos/toolbar"
  ]
 },
 "web/data-table": {
  "lead": "Bấm tên một cột để sắp xếp. Mũi tên là sort indicator; các hàng xám xen kẽ là zebra stripes.",
  "sym": [
   "<table>",
   "NSTableView"
  ],
  "aka": [
   "data grid",
   "sortable table",
   "table view (Apple term)",
   "list view with columns",
   "grid of records"
  ],
  "def": "“Một danh sách bản ghi có các cột” là data table: thẻ <table> của HTML trên web, NSTableView (SwiftUI Table) trên Mac, chế độ Details trong Windows File Explorer. Mỗi hàng là một bản ghi và mỗi cột là một trường, nằm dưới một hàng tiêu đề chứa tên cột; bấm vào tên để sắp xếp theo cột đó, và một mũi tên nhỏ cho biết cột nào, theo chiều nào. Nhiều bảng còn thêm zebra stripes, một cột checkbox và các đường chia cột kéo được. Nó không phải spreadsheet (bạn không gõ vào ô được) cũng không phải outline view (các hàng không lồng nhau), và trên iPhone, UITableView là một danh sách một cột chứ không phải lưới.",
  "phrases": [
   "danh sách bản ghi có các cột",
   "chế độ xem chi tiết của trình quản lý tệp Windows",
   "mũi tên nhỏ cạnh tên cột, đổi chiều khi bấm",
   "các hàng xen kẽ trắng và xám nhạt",
   "danh sách giống bảng tính mà sắp xếp được theo bất kỳ cột nào",
   "các thành phần trực quan dùng để hiển thị dữ liệu trong bảng (tiếng Hàn)"
  ],
  "anatomy": [
   {
    "n": "Select-all checkbox",
    "sym": "HTMLInputElement.indeterminate",
    "d": "“Checkbox ở trên cùng có dấu trừ bên trong” là select-all checkbox: nó đánh dấu mọi hàng, và hiện một dấu gạch (trạng thái indeterminate) khi chỉ một số hàng được đánh dấu."
   },
   {
    "n": "Column resize handle",
    "sym": "header.getResizeHandler()",
    "d": "“Đường mảnh giữa hai tên cột” là column resize handle: kéo nó để làm cột bên trái rộng ra hoặc hẹp lại."
   },
   {
    "n": "Sort indicator (sort arrow)",
    "sym": "aria-sort=\"ascending\"",
    "d": "“Mũi tên nhỏ cạnh tên cột” là sort indicator: nó đánh dấu duy nhất một cột đang dùng để sắp xếp các hàng, hướng lên là tăng dần và hướng xuống là giảm dần."
   },
   {
    "n": "Selected row",
    "sym": "aria-selected=\"true\"",
    "d": "“Hàng chuyển sang màu xanh khi tôi đánh dấu” là selected row: checkbox của nó được tick và cả hàng nhận một lớp màu nhấn nhạt."
   },
   {
    "n": "Zebra stripes (alternating rows)",
    "sym": "usesAlternatingRowBackgroundColors",
    "d": "“Các hàng xen kẽ trắng và xám nhạt” là zebra stripes: cứ cách một hàng lại có một dải mờ, để mắt bạn bám theo được một hàng xuyên suốt."
   }
  ],
  "prompt": "Hãy dựng một data table (HTML <table>; NSTableView của macOS, SwiftUI Table): một hàng tiêu đề chứa tên cột, bấm vào một tên thì sắp xếp theo cột đó và một mũi tên nhỏ cho thấy chiều (aria-sort đặt trên header ấy), các hàng có zebra stripes, và một cột checkbox mà ô ở header chọn tất cả và hiện dấu gạch khi chỉ một số hàng được tick. Căn phải các cột số. Hãy sắp xếp toàn bộ tập dữ liệu, không chỉ các hàng đang hiện trên màn hình.",
  "debug": "Hãy giúp tôi gỡ lỗi data table (thẻ <table>, thuộc tính aria-sort, thư viện TanStack Table, và NSTableView). Loại trừ lần lượt: chỉ sắp xếp trang hiện tại thay vì toàn bộ tập dữ liệu; số bị sắp xếp như chữ nên $1,215 nằm trên $640; mũi tên vẽ ở cột này trong khi aria-sort lại nằm ở cột khác, hoặc nằm cùng lúc trên nhiều header; các sọc bị nướng cứng vào dữ liệu của từng hàng nên bị chồng đôi sau khi sắp xếp hoặc lọc, thay vì theo tbody tr:nth-child(even); checkbox chọn tất cả không bao giờ hiện dấu gạch vì indeterminate chỉ đặt được từ JavaScript; header dính (sticky) bị cuộn đi mất vì một phần tử cha có overflow: hidden; các cột nhảy độ rộng khi các hàng thay đổi vì độ rộng chưa được cố định (table-layout: fixed); header của NSTableView không có mũi tên vì cột không có sortDescriptorPrototype. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "HTML",
    "text": "<table>",
    "note": "cùng các header <thead>, <th scope=\"col\"> và các hàng <tbody>"
   },
   {
    "lang": "AppKit",
    "text": "NSTableView",
    "note": "table view của Mac; tiêu đề cột nằm trong một NSTableHeaderView"
   },
   {
    "lang": "SwiftUI",
    "text": "Table(_:selection:sortOrder:columns:)",
    "note": "macOS 12+, iOS 16+; ràng buộc (bind) các hàng được tick và thứ tự sắp xếp"
   },
   {
    "lang": "ARIA",
    "text": "aria-sort=\"descending\"",
    "note": "đặt trên đúng một header mà các hàng đang sắp xếp theo"
   },
   {
    "lang": "shadcn/ui",
    "text": "<Table>",
    "note": "hướng dẫn Data Table của nó thêm sắp xếp và chọn hàng bằng TanStack Table"
   },
   {
    "lang": "Material UI",
    "text": "<DataGrid>",
    "note": "@mui/x-data-grid: có checkboxSelection, sắp xếp và đổi kích thước cột ngay trong bản miễn phí"
   }
  ],
  "see": [
   "web/pagination",
   "macos/outline-view",
   "macos/column-view",
   "web/bento-grid",
   "web/pie-donut-chart",
   "macos/rule-editor"
  ]
 },
 "web/date-picker": {
  "lead": "Bấm vào một ngày về sau: dải được nhuộm màu là in-range span (range_middle); số 19 có viền là ngày hôm nay.",
  "sym": [
   "<input type=\"date\">",
   "<DayPicker mode=\"range\" />"
  ],
  "aka": [
   "calendar picker",
   "calendar popup",
   "calendar dropdown",
   "date range picker",
   "month view"
  ],
  "def": "“Cuốn lịch nhỏ bật lên” ở một ô ngày là một date picker: ô nhập là phần kích hoạt (trigger), tháng nổi là calendar popover, còn lưới các ngày là một role=\"grid\" mà ngày được chọn mang aria-selected. Chọn hai đầu thì nó thành date-range picker: ngày đầu và ngày cuối là range start và range end (range_start / range_end trong react-day-picker), còn dải màu nằm giữa hai ngày đó là in-range span (range_middle). Một lưới tháng đứng riêng chỉ là một calendar; picker là loại được nối với một ô nhập.",
  "phrases": [
   "lịch",
   "lịch (tiếng Tây Ban Nha: calendario)",
   "lịch của bộ lọc theo khoảng ngày",
   "cuốn lịch nhỏ bật lên",
   "chọn ngày bắt đầu và ngày kết thúc",
   "ô văn bản có dropdown lịch"
  ],
  "anatomy": [
   {
    "n": "Previous / next month buttons",
    "sym": "button_previous / button_next",
    "d": "“Hai mũi tên nhỏ ở đầu lịch” là các nút previous/next month; icon bên trong mỗi nút, theo đúng tên gọi, là chevron."
   },
   {
    "n": "Range start / end",
    "sym": "range_start / range_end",
    "d": "“Ngày đầu và ngày cuối bạn đã bấm” là các điểm đầu mút của khoảng: các ô được tô đặc, đánh dấu nơi khoảng đã chọn bắt đầu và kết thúc."
   },
   {
    "n": "In-range span",
    "sym": "range_middle",
    "d": "“Dải được tô sáng giữa hai ngày” là in-range span: mọi ngày nằm giữa hai đầu mút đều nhận modifier range_middle và lớp màu nhạt."
   },
   {
    "n": "Today indicator",
    "sym": "today",
    "d": "“Ngày có viền nhưng không được chọn” là today indicator: nó đánh dấu ngày hiện tại, không phụ thuộc vào việc có chọn gì hay không."
   }
  ],
  "prompt": "Hãy dựng một date picker: một ô ngày mở ra calendar popover. Mẫu của shadcn/ui là Popover + Calendar, trong đó Calendar bọc DayPicker của react-day-picker. Với khoảng ngày thì dùng mode=\"range\": hai đầu mút nhận modifier range_start / range_end, còn các ngày được nhuộm màu ở giữa là range_middle. Hãy coi ngày là civil date (chuỗi yyyy-mm-dd), tuyệt đối không parse bằng Date theo UTC (lỗi lệch một ngày kinh điển); tuần bắt đầu theo locale; giữ nguyên mô hình bàn phím của lưới (mũi tên di chuyển theo ngày và theo tuần, PageUp/PageDown theo tháng).",
  "debug": "Hãy giúp tôi gỡ lỗi date picker (react-day-picker, hoặc <input type=\"date\">, hoặc chế độ range). Loại trừ lần lượt: ngày được chọn bị hiện lệch một ngày vì chuỗi chỉ có ngày bị parse như UTC rồi hiển thị theo giờ địa phương; sai tháng vì tháng trong Date của JavaScript đánh số từ 0; hai đầu khoảng bị đổi chỗ âm thầm, hoặc cho phép ngày kết thúc trước ngày bắt đầu sau khi gõ sửa; tuần bắt đầu sai ngày so với locale; calendar popover bị cắt bởi container có overflow, phần tử cha có transform, hoặc mép viewport; phím mũi tên không ăn vì lưới mất roving tabindex. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "HTML",
    "text": "<input type=\"date\">",
    "note": "control gốc của trình duyệt; giá trị của nó luôn có dạng yyyy-mm-dd"
   },
   {
    "lang": "React",
    "text": "<DayPicker mode=\"range\" />",
    "note": "của react-day-picker, thứ mà <Calendar> của shadcn/ui bọc lại"
   },
   {
    "lang": "Web API",
    "text": "input.showPicker()",
    "note": "mở picker gốc bằng code (cần có thao tác của người dùng)"
   },
   {
    "lang": "ARIA",
    "text": "role=\"grid\"",
    "note": "lưới lịch; ngày được chọn mang aria-selected=\"true\""
   },
   {
    "lang": "SwiftUI",
    "text": ".datePickerStyle(.graphical)",
    "note": "kiểu lịch nằm ngay trong trang của DatePicker trong SwiftUI"
   }
  ],
  "see": [
   "web/form-field",
   "web/popover-dropdown-tooltip",
   "web/combobox",
   "web/time-pickers"
  ]
 },
 "web/dialog-drawer-sheet": {
  "lead": "Ba biến thể trong cùng một demo: dialog, drawer và sheet.",
  "sym": [
   "<dialog>",
   "HTMLDialogElement.showModal()"
  ],
  "aka": [
   "modal",
   "side panel",
   "slide-over",
   "bottom sheet"
  ],
  "def": "Modal dialog nằm giữa màn hình, chặn phần giao diện bên dưới, và hợp với một quyết định ngắn hoặc một tác vụ cần tập trung. Drawer trượt ra từ mép bên và giữ lại nhiều ngữ cảnh nhìn thấy hơn cho việc duyệt hay chỉnh sửa. Sheet cũng gắn vào một mép, thường nhất là trồi lên từ đáy cho các thao tác gọn hoặc bố cục di động; cả ba đều cần cách đóng tường minh, và phải quản lý focus khi ở chế độ modal.",
  "phrases": [
   "popup ở giữa chặn cả trang",
   "panel trượt vào từ bên cạnh",
   "khay trồi lên từ phía dưới",
   "lớp phủ để chỉnh sửa mà không rời khỏi trang",
   "cái hộp nổi có nền tối phía sau"
  ],
  "anatomy": [
   {
    "n": "Modal surface",
    "sym": "<dialog>",
    "d": "“Cái hộp nổi thực sự ở giữa” là modal surface."
   },
   {
    "n": "Scrim",
    "sym": "::backdrop",
    "d": "“Nền tối xuyên thấu phía sau popup” là scrim."
   }
  ],
  "prompt": "Hãy dùng Modal Dialog dựng bằng <dialog> và mở nó bằng HTMLDialogElement.showModal(), để trình duyệt đặt nó vào top layer, làm trang phía sau trở thành inert, cung cấp ::backdrop và hỗ trợ phím Escape. Dùng Drawer bên cạnh cho việc chỉnh sửa theo ngữ cảnh, hoặc Sheet ở đáy cho thao tác gọn/di động; chỉ thêm scrim và quản lý focus kiểu modal khi các bề mặt đó thực sự là modal.",
  "debug": "Hãy giúp tôi gỡ lỗi dialog/drawer/sheet (dùng HTMLDialogElement, hoặc Radix Dialog, hoặc vaul). Loại trừ lần lượt: dùng show() ở chỗ cần showModal() nên không có backdrop và nền phía sau không bị inert; body scroll không bị khoá nên trang vẫn cuộn ở phía sau; focus không được trả về nút kích hoạt khi đóng; Escape đóng nó vì onCancel không được xử lý trong khi bạn muốn chặn; dialog lồng nhau đóng luôn dialog cha. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "HTML",
    "text": "<dialog>"
   },
   {
    "lang": "HTML",
    "text": "HTMLDialogElement.showModal()"
   },
   {
    "lang": "ARIA",
    "text": "role=\"dialog\""
   },
   {
    "lang": "Radix",
    "text": "Dialog"
   },
   {
    "lang": "shadcn/ui",
    "text": "Sheet"
   }
  ],
  "see": [
   "web/scrim",
   "web/popover-dropdown-tooltip",
   "macos/sheet",
   "macos/sidebar",
   "web/lightbox",
   "web/hamburger-menu",
   "web/alert-callout-banner",
   "web/bottom-navigation",
   "web/product-tour"
  ]
 },
 "web/divider": {
  "lead": "Chỉ là hình thức nhìn thấy, không mang ý nghĩa.",
  "sym": [
   "<hr>",
   "role=\"separator\""
  ],
  "aka": [
   "separator",
   "rule",
   "horizontal rule",
   "visual divider"
  ],
  "def": "Horizontal rule đánh dấu chỗ đổi chủ đề trong nội dung, nên HTML cho nó phần tử ngữ nghĩa <hr>. Separator ngăn cách các nhóm control hoặc các vùng, và có thể dùng role=\"separator\" khi không có phần tử ngữ nghĩa gốc nào phù hợp. Nếu đường kẻ chỉ là trang trí, thì nó là một CSS border và không nên được đọc ra như một phần tử. SwiftUI Divider và các mục menu ngăn cách của AppKit là những họ hàng quen thuộc bên macOS.",
  "phrases": [
   "giữa mấy đường ngắt dòng đó",
   "phía trên đường ngắt dòng kia",
   "một đường ngắt dọc giữa các phần đó",
   "đường ngắt chia giữa cái tiêu đề kia và nút tải xuống",
   "có lẽ nên thêm một đường kẻ dọc để chia",
   "cái thứ đường kẻ ngang"
  ],
  "anatomy": [
   {
    "n": "Thematic break (horizontal rule)",
    "sym": "<hr>",
    "d": "“Phía trên đường ngắt kia” có thể chỉ một horizontal rule: một <hr> đánh dấu chỗ đổi chủ đề thật sự giữa các phần nội dung."
   },
   {
    "n": "Semantic separator",
    "sym": "role=\"separator\"",
    "d": "“Một đường ngắt dọc giữa các phần đó” là semantic separator khi nó chia các vùng riêng biệt hoặc các nhóm control."
   },
   {
    "n": "Decorative CSS border",
    "sym": "border-block-start",
    "d": "“Có lẽ thêm một đường kẻ dọc” có thể chỉ là trang trí; khi nó không truyền đạt cấu trúc nào thì dùng CSS border và không gắn ngữ nghĩa separator."
   },
   {
    "n": "macOS divider and separator item",
    "sym": "Divider / NSMenuItem.separator()",
    "d": "Trong giao diện macOS, SwiftUI gọi đường kẻ nhìn thấy là Divider, còn đường kẻ giữa các nhóm lệnh trong menu là một mục ngăn cách NSMenuItem (separator item)."
   }
  ],
  "prompt": "Hãy chọn đúng loại Divider, Separator hay Rule: dùng <hr> của HTML cho thematic break mang ngữ nghĩa trong nội dung, dùng role=\"separator\" cho ranh giới cấu trúc giữa các nhóm control, và dùng CSS border như border-block-start cho đường kẻ thuần trang trí. Trên macOS, dùng SwiftUI Divider cho đường chia nhìn thấy, hoặc NSMenuItem.separator() giữa các nhóm mục menu.",
  "debug": "Hãy giúp tôi gỡ lỗi divider (hr, role=separator, các utility về border). Loại trừ lần lượt: đường hairline bị nhân đôi hoặc biến mất khi zoom lẻ vì border 1px làm tròn khác nhau; divider trang trí vẫn bị trình đọc màn hình đọc ra (loại trang trí cần aria-hidden, loại ngữ nghĩa cần role=separator); phần tử cha flex kéo giãn divider trong khi chỉ định một kích thước cross cố định; margin collapse nuốt mất khoảng trống quanh một hr. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "HTML",
    "text": "<hr>"
   },
   {
    "lang": "ARIA",
    "text": "role=\"separator\""
   },
   {
    "lang": "CSS",
    "text": "border-block-start",
    "note": "chỉ để trang trí"
   },
   {
    "lang": "SwiftUI",
    "text": "Divider"
   },
   {
    "lang": "AppKit",
    "text": "NSMenuItem.separator()"
   }
  ],
  "see": [
   "macos/menu-bar",
   "macos/context-menu",
   "macos/split-view",
   "web/three-dots",
   "web/sign-in-form"
  ]
 },
 "web/drag-and-drop": {
  "lead": "“Mấy cái ô vuông ở các góc”.",
  "sym": [
   "ondrop",
   "ondragover"
  ],
  "aka": [
   "drag and drop",
   "drag-and-drop interaction",
   "direct manipulation",
   "sortable drag"
  ],
  "def": "Drag and drop cho phép người dùng di chuyển hoặc đặt một đối tượng trực tiếp. Grip chỉ chỗ để nắm, drag preview đi theo con trỏ, và một đường chèn (insertion line) hoặc đích được tô sáng cho xem trước vị trí đến trước khi thả. Các resize handle của vùng chọn là những control liên quan quanh một đối tượng đang chọn: chúng đổi kích thước của nó chứ không di chuyển nó.",
  "phrases": [
   "mấy cái kiểu 3x3 hay 2x2 đó",
   "mấy cái ô vuông, bạn biết đấy, nằm ở các góc",
   "các vạch chỉ ra chỗ nó sẽ được thả",
   "cả cái terminal bên cạnh được tô sáng lên",
   "một nửa cái terminal đó được tô sáng",
   "bản sao mờ đi theo con trỏ",
   "kéo để chuyển một tuỳ chọn từ bên này sang bên kia"
  ],
  "anatomy": [
   {
    "n": "Drag handle (grip)",
    "sym": "draggable=\"true\"",
    "d": "Những chấm “kiểu 3x3 hay 2x2 đó” là một drag handle, còn gọi là grip hay grabber."
   },
   {
    "n": "Selection resize handles",
    "sym": "pointer events",
    "d": "“Mấy cái ô vuông, bạn biết đấy, nằm ở các góc” là selection resize handles quanh đối tượng đang chọn."
   },
   {
    "n": "Drop indicator (insertion line)",
    "sym": "ondragover",
    "d": "“Các vạch chỉ ra chỗ nó sẽ được thả” là drop indicator, thường được vẽ thành một insertion line giữa các mục."
   },
   {
    "n": "Drop-target highlight",
    "sym": "ondragover",
    "d": "“Cả cái terminal bên cạnh được tô sáng lên” mô tả một drop-target highlight phủ lên vùng đích."
   },
   {
    "n": "Drag preview (ghost)",
    "sym": "DataTransfer.setDragImage()",
    "d": "Bản sao nửa trong suốt đi theo con trỏ trong lúc kéo là drag preview, thường gọi là ghost."
   }
  ],
  "prompt": "Hãy dựng một tương tác Drag & Drop bằng draggable, ondragover và ondrop của HTML (hoặc @dnd-kit/core): hiện một drag handle, các selection resize handle ở nơi áp dụng được, một drag preview, và một insertion line hoặc đích thả được tô sáng trước khi thả. Không dùng trạng thái aria-grabbed đã deprecated; hãy thông báo mục vừa nhấc lên, đích có thể thả và kết quả thả qua một ARIA live region.",
  "debug": "Hãy giúp tôi gỡ lỗi drag and drop (gồm draggable của HTML, rồi cặp ondragover/ondrop, rồi dnd-kit). Loại trừ lần lượt: drop không bao giờ bắn vì dragover không gọi preventDefault (đây là lỗi kinh điển); dragleave bắn khi con trỏ đi vào phần tử con khiến highlight nhấp nháy (hãy giữ một bộ đếm enter/leave); setDragImage bị bỏ qua vì phần tử ghost không nằm trong DOM; thiết bị cảm ứng không làm gì vì DnD HTML5 gốc không có sự kiện touch (hãy dùng thư viện dựa trên pointer). Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "HTML",
    "text": "ondrop"
   },
   {
    "lang": "HTML",
    "text": "ondragover"
   },
   {
    "lang": "HTML",
    "text": "draggable=\"true\""
   },
   {
    "lang": "ARIA",
    "text": "aria-grabbed",
    "note": "đã deprecated; hãy dùng live region để thông báo trạng thái kéo và kết quả thả"
   },
   {
    "lang": "dnd-kit",
    "text": "@dnd-kit/core"
   }
  ],
  "see": [
   "macos/split-view",
   "web/focus-ring-web",
   "web/three-dots",
   "web/bento-grid",
   "web/resize-handle"
  ]
 },
 "web/easing": {
  "lead": "Các biểu đồ nhỏ là đường cong thời gian; hình chữ S là cubic-bezier(.4, 0, .2, 1), đó là lý do chấm phía dưới lướt đi mượt còn chấm phía trên thì bước đều.",
  "sym": [
   "transition-timing-function",
   "cubic-bezier(.4, 0, .2, 1)"
  ],
  "aka": [
   "timing function",
   "easing curve",
   "bezier curve"
  ],
  "def": "Câu “animation nhìn máy móc quá” gần như luôn là chuyện easing: timing function, tức đường cong ánh xạ thời gian sang tiến độ. Linear đi với tốc độ không đổi; ease-out bắt đầu nhanh rồi hạ cánh nhẹ nhàng; ease-in-out là đường cong chữ S mà chuyển động UI mặc định dùng. Bốn con số trong cubic-bezier() chẳng qua là hai điểm điều khiển của đồ thị ấy.",
  "phrases": [
   "animation nhìn máy móc và đều đều",
   "cách chuyển động tăng tốc rồi chậm lại",
   "đường cong điều khiển tốc độ của animation",
   "làm cho nó bắt đầu nhanh và kết thúc chậm",
   "đồ thị hình chữ S trong phần cài đặt animation"
  ],
  "anatomy": [
   {
    "n": "Timing curve",
    "sym": "cubic-bezier(x1, y1, x2, y2)",
    "d": "“Đồ thị hình chữ S trong trình chỉnh animation” chính là timing curve: thời gian chạy từ trái sang phải, tiến độ từ dưới lên trên."
   }
  ],
  "prompt": "Hãy sửa easing cho animation của tôi: thay timing linear/mặc định bằng một đường cong tường minh, dùng thuộc tính transition-timing-function với giá trị cubic-bezier(.4, 0, .2, 1) cho các chuyển động UI (bắt đầu nhanh, hạ cánh nhẹ), ease-out cho thứ đi vào, ease-in cho thứ đi ra; giữ thời lượng 150–300ms cho các chuyển tiếp của giao diện, và đừng bao giờ animate với tốc độ linear trừ khi đó là vòng lặp liên tục kiểu marquee.",
  "debug": "Hãy giúp tôi gỡ lỗi cảm giác của animation (thuộc tính transition-timing-function của CSS, hoặc cubic-bezier). Loại trừ lần lượt: chưa đặt timing function nên rơi về ease mặc định; timing linear khiến chuyển động UI nhìn máy móc; ease-in trên phần tử ĐANG VÀO (phần tử đi vào cần ease-out, giảm tốc dần vào đúng chỗ); cubic-bezier có giá trị y ngoài khoảng 0–1 bị cắt thay vì vọt quá đà, do thứ tự trong dạng viết gọn transition; thời lượng dài tới mức đường cong đọc ra như độ trễ. Triệu chứng tôi gặp là:",
  "code": [
   {
    "lang": "CSS",
    "text": "transition-timing-function",
    "note": "các từ khoá linear, ease, rồi ease-in, rồi ease-out, rồi ease-in-out"
   },
   {
    "lang": "CSS",
    "text": "cubic-bezier(.4, 0, .2, 1)",
    "note": "đường cong tuỳ biến; bốn con số là hai điểm điều khiển"
   },
   {
    "lang": "CSS",
    "text": "linear(…)",
    "note": "các đường cong từng đoạn vượt ngoài bezier (lò xo, nảy); baseline từ năm 2023"
   },
   {
    "lang": "Motion",
    "text": "transition={{ ease: \"easeInOut\" }}"
   }
  ],
  "see": [
   "web/spring",
   "web/marquee",
   "web/parallax",
   "web/hover-effects"
  ]
 },
 "web/empty-state": {
  "lead": "Dự án mới",
  "sym": [
   "<section>",
   "aria-labelledby"
  ],
  "aka": [
   "blank state",
   "zero state",
   "first-use state",
   "no-results state"
  ],
  "def": "Empty state (trạng thái trống) là phần giao diện thay chỗ cho khung nội dung khi chưa có mục nào để hiển thị, dù đó là lần dùng đầu tiên, sau khi lọc ra kết quả rỗng, hay sau khi người dùng đã xóa hết. Nó giải thích tình huống mà không đổ lỗi cho ai và đưa ra hành động tiếp theo hữu ích nhất. Đây là một trạng thái sản phẩm được thiết kế chủ đích, chứ không đơn thuần là khoảng trắng hay một dòng báo lỗi.",
  "phrases": [
   "màn hình hiện ra khi ở đây chưa có gì",
   "khung hiển thị trước khi người dùng tạo mục đầu tiên của mình",
   "dòng báo không có kết quả kèm một nút bấm",
   "đoạn giải thích cho danh sách đang trống",
   "thứ nên hiện thay cho cái hộp trắng trơn"
  ],
  "anatomy": [
   {
    "n": "State illustration",
    "sym": "aria-hidden=\"true\"",
    "d": "Khi ai đó nói “bức tranh nhẹ nhàng cho biết vùng trống này dùng để làm gì”, họ đang nhắc tới state illustration (hình minh họa trạng thái)."
   },
   {
    "n": "Recovery action",
    "sym": "<button>",
    "d": "“Nút giúp tôi thoát khỏi màn hình trống” chính là recovery action (hành động khắc phục)."
   }
  ],
  "prompt": "Hãy tạo một empty state dưới dạng <section> có nhãn, gồm một icon đơn giản, một dòng giải thích vì sao khung nhìn đang trống, và một hành động chính để giải quyết tình trạng đó. Với trạng thái không có kết quả được sinh ra động, hãy thông báo nội dung bằng role=\"status\" và không được chuyển focus.",
  "debug": "Hãy gỡ lỗi empty state của tôi. Loại trừ lần lượt các khả năng sau: empty state nháy lên trước khi dữ liệu về tới vì trạng thái đang tải và trạng thái thực sự rỗng bị gộp vào chung một biến boolean; lỗi lại hiển thị empty state thay vì một error state; nút kêu gọi hành động không với tới được bằng bàn phím; bố cục bị giật khi nội dung thật thay thế vì chưa từng giữ sẵn chiều cao. Triệu chứng:",
  "code": [
   {
    "lang": "HTML",
    "text": "<section>"
   },
   {
    "lang": "ARIA",
    "text": "aria-labelledby"
   },
   {
    "lang": "ARIA",
    "text": "role=\"status\"",
    "note": "dùng cho thông báo không có kết quả được sinh ra động"
   }
  ],
  "see": [
   "web/skeleton-spinner",
   "web/toast",
   "web/command-palette"
  ]
 },
 "web/floating-buttons": {
  "lead": "FAB: hành động chính của ứng dụng, cùng speed dial của nó",
  "sym": [
   "position: fixed",
   "FloatingActionButton"
  ],
  "aka": [
   "FAB",
   "floating button",
   "Messenger launcher (Intercom term)",
   "chat widget button",
   "scroll-to-top button"
  ],
  "def": "“Một nút tròn nằm ở cuối màn hình” thường là một trong ba thứ: floating action button, chat launcher hoặc back-to-top button. Floating action button (FAB; trong Compose là FloatingActionButton, trong Material UI là <Fab>) là hành động chính của ứng dụng, một dấu “+” lơ lửng trên nội dung và có thể bung ra một speed dial gồm các hành động nhỏ có nhãn. Chat launcher là bong bóng tròn mở khung chat hỗ trợ trên một trang web (Intercom gọi nó là Messenger launcher), thường đi kèm bong bóng chào và huy hiệu chưa đọc màu đỏ, còn back-to-top button chỉ xuất hiện sau khi bạn đã cuộn xuống. Không thứ nào trong số đó là bottom navigation, tức hàng tab cố định.",
  "phrases": [
   "một nút tròn ở cuối màn hình",
   "một thẻ nổi chứa nội dung quảng bá, bật ra ở góc dưới bên phải trang web sau khi bấm vào một biểu tượng nổi",
   "thứ lơ lửng ở góc dưới bên phải của trang",
   "nút nổi trông giống như một hiệu ứng mở ra",
   "nút dấu cộng ở góc, bấm vào thì bung ra mấy nút nhỏ",
   "bong bóng chat ở góc dưới bên phải của website, có số 1 màu đỏ",
   "mũi tên hiện ra khi cuộn xuống và đưa mình về lại đầu trang"
  ],
  "anatomy": [
   {
    "n": "Floating action button (FAB)",
    "sym": "FloatingActionButton",
    "d": "“Nút dấu cộng tròn lơ lửng phía trên danh sách” là một floating action button: hành động chính duy nhất của ứng dụng, được giữ ở góc dưới bên phải trong khi nội dung cuộn dưới nó."
   },
   {
    "n": "Speed dial",
    "sym": "<SpeedDial>",
    "d": "“Mấy nút nhỏ bật ra từ dấu cộng” là speed dial: từ ba đến sáu hành động tròn nhỏ có nhãn, xòe lên phía trên từ FAB."
   },
   {
    "n": "Chat launcher",
    "sym": "alignment (Intercom)",
    "d": "“Bong bóng chat ở góc một trang web” là chat launcher (Intercom gọi là Messenger launcher; Zendesk gọi là launcher): nút tròn dùng để mở khung chat hỗ trợ."
   },
   {
    "n": "Greeting bubble",
    "sym": "",
    "d": "“Tấm thẻ nhỏ bật ra nói xin chào” là greeting bubble: một lời nhắn ngắn từ đội hỗ trợ, đặt cạnh launcher, có ảnh đại diện và dấu đóng."
   },
   {
    "n": "Back-to-top button",
    "sym": "FloatButton.BackTop",
    "d": "“Mũi tên hiện ra sau khi cuộn xuống” là back-to-top button: ẩn khi đang ở đầu trang, mờ dần hiện ra khi vượt một ngưỡng cuộn và đưa bạn nhảy ngược lên trên."
   }
  ],
  "prompt": "Hãy thêm một nút hành động nổi (Jetpack Compose FloatingActionButton; Material UI <Fab>): một nút tròn màu nhấn có dấu cộng trắng, cố định ở góc dưới bên phải (position: fixed), mở ra một speed dial (<SpeedDial>) gồm ba hành động nhỏ có nhãn. Chỉ cho nút về đầu trang (Ant Design FloatButton.BackTop) hiện ra khi đã cuộn quá 400 px. Nếu có chat launcher thì xếp chung với chúng trong một FloatButton.Group đặt phía trên env(safe-area-inset-bottom), và đừng bao giờ che phần nội dung mà người dùng cần chạm vào.",
  "debug": "Hãy gỡ lỗi các nút nổi của tôi (dùng <Fab>, FloatingActionButton, <SpeedDial>, position: fixed, FloatButton.BackTop, FloatButton.Group, hay launcher của Intercom hoặc Zendesk). Loại trừ lần lượt: nút bị cuộn đi theo trang vì một phần tử tổ tiên có transform hoặc filter, khiến position: fixed bám vào tổ tiên đó thay vì màn hình; nút nằm đè lên thanh tab dưới hoặc chui xuống dưới home indicator của iPhone vì bottom bỏ qua env(safe-area-inset-bottom) (thứ này cần viewport-fit=cover); chat launcher và back-to-top button chồng lên cùng một chỗ thay vì được xếp trong một FloatButton.Group hoặc dời đi bằng vertical_padding của launcher; back-to-top button không bao giờ hiện vì nó lắng nghe cuộn của window trong khi trang lại cuộn bên trong một container (hãy đặt target); dòng cuối của danh sách hoặc nút Submit bị chôn dưới nút nổi do không chừa padding dưới; các hành động của speed dial không có nhãn nhìn thấy được hoặc bàn phím không với tới; z-index thấp hơn sticky footer hoặc lớp phủ scrim của dialog. Triệu chứng:",
  "code": [
   {
    "lang": "CSS",
    "text": "position: fixed",
    "note": "kèm bottom và right, thêm env(safe-area-inset-bottom) trên điện thoại"
   },
   {
    "lang": "Jetpack Compose",
    "text": "FloatingActionButton",
    "note": "còn có SmallFloatingActionButton, LargeFloatingActionButton, và ExtendedFloatingActionButton có kèm nhãn"
   },
   {
    "lang": "Material UI",
    "text": "<Fab>",
    "note": "variant=\"extended\" thêm nhãn chữ"
   },
   {
    "lang": "Material UI",
    "text": "<SpeedDial>",
    "note": "các hành động nhỏ là <SpeedDialAction>; dùng từ ba đến sáu cái"
   },
   {
    "lang": "Ant Design",
    "text": "FloatButton.BackTop",
    "note": "hiện ra sau visibilityHeight, mặc định 400 px; xếp nhiều nút bằng FloatButton.Group"
   },
   {
    "lang": "Intercom",
    "text": "custom_launcher_selector",
    "note": "mở Messenger từ nút của riêng bạn thay vì launcher mặc định"
   }
  ],
  "see": [
   "web/bottom-navigation",
   "web/chat-bubble",
   "web/sticky-fixed"
  ]
 },
 "web/focus-ring-web": {
  "lead": "Nhấn Tab ⇥",
  "sym": [
   ":focus-visible",
   ":focus"
  ],
  "aka": [
   "focus indicator",
   "keyboard focus outline",
   "focus halo"
  ],
  "def": "Focus ring (vòng tiêu điểm) cho biết phần tử nào sẽ nhận thao tác bàn phím kế tiếp. Pseudo-class :focus khớp với mọi phần tử đang có focus, còn :focus-visible để trình duyệt hiện chỉ báo nổi bật khi kiểu nhập liệu hoặc loại control cần đến, rõ nhất là lúc điều hướng bằng bàn phím. Đừng bao giờ gỡ outline mặc định nếu không đưa vào một thứ thay thế có độ nhìn thấy tương đương.",
  "phrases": [
   "đường viền quanh nút sau khi nhấn tab",
   "vòng màu xanh quanh control đang được chọn",
   "phần tô sáng khi điều hướng bằng bàn phím",
   "viền cho biết nút nào đang có focus",
   "cái vòng không nên hiện ra mỗi lần click chuột"
  ],
  "anatomy": [
   {
    "n": "Focus outline",
    "sym": "outline",
    "d": "“Đường xanh quanh nút sau khi tôi nhấn Tab” là focus outline."
   },
   {
    "n": "Outline offset",
    "sym": "outline-offset",
    "d": "“Khoảng hở nhỏ giữa control và đường focus của nó” là outline offset."
   }
  ],
  "prompt": "Hãy tạo kiểu cho focus ring của bàn phím bằng :focus-visible, thay vì tắt outline của trình duyệt trên toàn cục. Làm cho nó có độ tương phản cao và cách control một khoảng rõ ràng; chỉ dùng :focus cho những trạng thái bắt buộc áp dụng bất kể focus đến từ bàn phím hay con trỏ.",
  "debug": "Hãy gỡ lỗi focus ring của tôi (outline, :focus-visible). Loại trừ lần lượt: outline:none đặt toàn cục làm hỏng điều hướng bằng bàn phím ở mọi nơi; :focus tạo kiểu cho cả cú click chuột trong khi ý định là dùng :focus-visible; vòng bị cắt mất bởi một phần tử tổ tiên có overflow-hidden, hãy dùng outline-offset hoặc box-shadow bên trong; vòng box-shadow không nhìn thấy được vì trùng màu với nền; gọi .focus() bằng code mà không hiện vòng khi thiếu các tùy chọn focus-visible. Triệu chứng:",
  "code": [
   {
    "lang": "CSS",
    "text": ":focus-visible"
   },
   {
    "lang": "CSS",
    "text": ":focus"
   },
   {
    "lang": "HTML",
    "text": "tabindex"
   }
  ],
  "see": [
   "web/form-field",
   "macos/focus-ring",
   "web/command-palette",
   "web/switch-checkbox-radio",
   "web/toggle-group",
   "web/sign-in-form"
  ]
 },
 "web/form-field": {
  "lead": "Gõ vào ô Email, dòng chữ xám gợi ý biến mất đó chính là placeholder",
  "sym": [
   "<label for>",
   "::placeholder"
  ],
  "aka": [
   "text field",
   "input field",
   "form input",
   "form control"
  ],
  "def": "“Chữ xám nằm trong ô và biến mất khi bạn gõ” là placeholder, một trong năm bộ phận của form field mà bộ phận nào cũng có tên gọi riêng. Chữ nằm phía trên ô là label (<label for>), ngôi sao đỏ nhỏ là required indicator, dòng xám nhỏ bên dưới là helper text, và dòng đỏ thay vào chỗ đó là validation message. Việc nối chúng lại với nhau (for/id, aria-describedby, aria-invalid) mới là thứ khiến trình đọc màn hình dùng được field này, chứ không chỉ người nhìn thấy.",
  "phrases": [
   "chữ xám trong ô nhập và mất đi khi gõ",
   "ngôi sao đỏ nhỏ cạnh nhãn",
   "dòng chữ xám nhỏ phía dưới ô nhập",
   "thông báo lỗi màu đỏ bên dưới trường",
   "chữ nằm phía trên ô văn bản",
   "dòng gợi ý trong ô nhập đang để trống",
   "chữ xám trong ô nhập, gõ chữ vào thì biến mất"
  ],
  "anatomy": [
   {
    "n": "Label",
    "sym": "<label for=\"…\">",
    "d": "“Chữ nằm phía trên ô” là label, một thẻ <label> thật sự được gắn vào input qua for/id, nên bấm vào nó sẽ chuyển focus vào field."
   },
   {
    "n": "Required indicator",
    "sym": "required",
    "d": "“Ngôi sao đỏ nhỏ” đánh dấu một trường bắt buộc; dấu sao chỉ là trang trí, còn bản thân input mới mang thuộc tính required."
   },
   {
    "n": "Placeholder",
    "sym": "::placeholder",
    "d": "“Chữ xám trong ô và biến mất khi bạn gõ” là placeholder, tức một ví dụ hoặc gợi ý, và không bao giờ được thay cho label."
   },
   {
    "n": "Helper text",
    "sym": "aria-describedby",
    "d": "“Dòng xám nhỏ dưới trường” là helper text; hãy liên kết nó với input bằng aria-describedby để trình đọc màn hình đọc to lên."
   },
   {
    "n": "Error message",
    "sym": "aria-invalid=\"true\"",
    "d": "“Chữ đỏ dưới ô” là validation message; hãy ghép viền đỏ (aria-invalid, :user-invalid) với một thông báo mà field có tham chiếu tới."
   }
  ],
  "prompt": "Hãy dựng form field với đủ các bộ phận: một <label for> thật phía trên input (bấm vào thì focus vào trường), placeholder chỉ làm gợi ý và không bao giờ làm label, helper text bên dưới được liên kết qua aria-describedby, và trường bắt buộc được đánh dấu bằng thuộc tính required cùng dấu sao hiển thị. Khi dữ liệu nhập không hợp lệ, hãy đặt aria-invalid=\"true\", tạo kiểu cho trạng thái đỏ bằng :user-invalid, và trỏ aria-describedby tới thông báo lỗi.",
  "debug": "Hãy gỡ lỗi form field của tôi (label for/id, aria-describedby, placeholder). Loại trừ lần lượt: placeholder gánh vai trò của label rồi biến mất ngay ở phím gõ đầu tiên; label không được liên kết nên bấm vào nó không focus vào input; văn bản lỗi không được liên kết qua aria-describedby nên trình đọc màn hình không bao giờ đọc nó; màu nền vàng/xanh của autofill đè lên kiểu của bạn (-webkit-autofill). Triệu chứng:",
  "code": [
   {
    "lang": "HTML",
    "text": "<label for>"
   },
   {
    "lang": "CSS",
    "text": "::placeholder"
   },
   {
    "lang": "ARIA",
    "text": "aria-describedby",
    "note": "nối helper text/văn bản lỗi với input"
   },
   {
    "lang": "ARIA",
    "text": "aria-invalid"
   },
   {
    "lang": "CSS",
    "text": ":user-invalid",
    "note": "chỉ báo không hợp lệ sau khi người dùng đã tương tác"
   },
   {
    "lang": "HTML",
    "text": "required"
   }
  ],
  "see": [
   "web/focus-ring-web",
   "web/combobox",
   "web/switch-checkbox-radio",
   "web/resize-handle",
   "web/sign-in-form",
   "web/date-picker",
   "web/time-pickers"
  ]
 },
 "web/hamburger-menu": {
  "lead": "Nút ba gạch ☰ là hamburger, còn tấm panel trượt ra khi bấm là navigation drawer",
  "sym": [
   "aria-expanded + aria-controls",
   "<nav>"
  ],
  "aka": [
   "navigation drawer",
   "hamburger button",
   "side menu",
   "off-canvas menu"
  ],
  "def": "“Ba đường kẻ ngang dùng để mở menu” là hamburger button, và tấm panel trượt ra từ đó là navigation drawer. Nút chỉ là bộ kích hoạt, gồm ba gạch xếp chồng, thường nằm góc trên bên trái trên điện thoại; còn drawer là một <nav> off-canvas trượt phủ lên trang, nằm trên một lớp scrim. Những biểu tượng anh em của nó (dấu chấm, dấu ba chấm) được nói ở mục The Three Dots; còn trang này nói về chính mẫu điều hướng gồm biểu tượng cộng với drawer.",
  "phrases": [
   "ba đường kẻ ngang dùng để mở menu",
   "menu bên cạnh ba gạch, bung ra phủ kín cả chiều rộng màn hình",
   "menu hamburger trên các trang web di động",
   "menu trượt vào từ cạnh khi chạm vào mấy đường kẻ",
   "nút các đường kẻ xếp chồng ở góc trên",
   "panel bên hông chứa mọi liên kết của trang"
  ],
  "anatomy": [
   {
    "n": "Hamburger button",
    "sym": "aria-expanded",
    "d": "“Ba đường kẻ xếp chồng” là hamburger button, một nút bật/tắt đơn giản có aria-expanded theo dõi trạng thái của drawer."
   },
   {
    "n": "Navigation drawer",
    "sym": "Sheet side=\"left\"",
    "d": "“Menu bên hông trượt phủ lên trang” là navigation drawer, một panel <nav> off-canvas nằm phía trên scrim."
   }
  ],
  "prompt": "Hãy dựng một hamburger menu: một <button aria-expanded aria-controls> vẽ ba gạch xếp chồng, dùng để bật/tắt một navigation drawer, tức một panel <nav> off-canvas trượt vào từ bên trái phủ trên một scrim (Sheet side=\"left\" của shadcn, NavigationDrawer của Material). Khóa cuộn của body khi drawer đang mở, đóng khi nhấn Escape hoặc chạm vào scrim, giữ aria-expanded luôn đồng bộ, và trả focus về nút khi đóng.",
  "debug": "Hãy gỡ lỗi hamburger menu của tôi (nút bật/tắt aria-expanded cùng drawer <nav> off-canvas). Loại trừ lần lượt: drawer bị vẽ dưới scrim hoặc dưới header của trang (thứ tự z); body vẫn cuộn được phía sau khi drawer đang mở; aria-expanded không bao giờ đổi giá trị nên trình đọc màn hình thấy một cái nút chết; focus bị lạc lại trong drawer sau khi đóng thay vì quay về nút; drawer chạy animation từ sai cạnh vì dấu của translate-x bị đảo; menu không với tới được trên desktop vì nút bật/tắt bị ẩn khi vượt breakpoint mà các liên kết nav lại không hiện ra trở lại. Triệu chứng:",
  "code": [
   {
    "lang": "ARIA",
    "text": "aria-expanded + aria-controls",
    "note": "hợp đồng của nút bật/tắt"
   },
   {
    "lang": "HTML",
    "text": "<nav>",
    "note": "nội dung drawer là phần điều hướng"
   },
   {
    "lang": "shadcn/ui",
    "text": "Sheet side=\"left\"",
    "note": "khối dựng React thường dùng"
   },
   {
    "lang": "Material",
    "text": "NavigationDrawer",
    "note": "tên mà Android/Material đặt cho panel này"
   }
  ],
  "see": [
   "web/three-dots",
   "web/dialog-drawer-sheet",
   "web/scrim",
   "web/header-navbar",
   "web/bottom-navigation",
   "web/waffle-menu",
   "web/cascading-menus"
  ]
 },
 "web/header-navbar": {
  "lead": "Bấm vào một liên kết: cả dải phía trên là header, riêng hàng liên kết mới là nav",
  "sym": [
   "<header>",
   "<nav>"
  ],
  "aka": [
   "navbar",
   "topbar",
   "app bar",
   "main navigation",
   "page header"
  ],
  "def": "“Cái navbar” thường là hai thứ lồng nhau. Site header là cả dải chạy ngang phía trên cùng, gồm logo, các liên kết, ô tìm kiếm, nút đăng nhập, và trong HTML nó là <header> ở cấp trang, tức banner landmark. Navigation bar đúng nghĩa chỉ là nhóm các liên kết điểm đến nằm bên trong đó: một phần tử <nav>, với aria-current=\"page\" đánh dấu liên kết của trang bạn đang ở. Trên macOS, thanh nằm sát mép trên cùng của màn hình là menu bar, một thứ khác hẳn.",
  "phrases": [
   "navbar",
   "thanh điều hướng ở phía trên",
   "phần tử điều hướng trên cùng có các liên kết tới những trang chính",
   "topbar",
   "thanh ở đầu website chứa các liên kết",
   "menu của phần header",
   "thanh nhỏ dưới header có các lựa chọn để chuyển sang những trang khác"
  ],
  "anatomy": [
   {
    "n": "Site header",
    "sym": "<header>",
    "d": "“Cả thanh chạy ngang đầu trang web” là site header, lớp vỏ rộng toàn chiều ngang chứa thương hiệu, nav và các nút hành động; đó là banner landmark của trang."
   },
   {
    "n": "Navigation region",
    "sym": "<nav>",
    "d": "“Các liên kết home, docs, pricing” là navigation region, một <nav> chỉ bao quanh những liên kết điểm đến, không gồm logo hay các nút xung quanh."
   },
   {
    "n": "Current-page link",
    "sym": "aria-current=\"page\"",
    "d": "“Mục menu cứ được tô sáng vì bạn đang ở trang đó” là current-page link, được đánh dấu bằng aria-current=\"page\" và tạo kiểu dựa theo chính thuộc tính ấy."
   }
  ],
  "prompt": "Hãy dựng một site header có navigation bar: một <header> ở cấp trang (banner landmark) chứa dấu hiệu thương hiệu, một <nav aria-label=\"Main\"> chỉ bao quanh hàng liên kết điểm đến, và các nút hành động ở bên phải. Đánh dấu liên kết của trang hiện tại bằng aria-current=\"page\" và tạo kiểu cho trạng thái hiện tại dựa vào thuộc tính đó, không dựa vào một class.",
  "debug": "Hãy gỡ lỗi site header / navbar của tôi (<header>, <nav>, aria-current). Loại trừ lần lượt: cả header bị bọc trong <nav> nên trình đọc màn hình thông báo các nút và logo như phần điều hướng (chỉ nhóm liên kết mới là <nav>); hai phần tử <nav> không có nhãn (hãy đặt aria-label cho từng cái); kiểu trang hiện tại được gán bằng một class đã lệch khỏi route thay vì dùng aria-current=\"page\"; header đè lên nội dung vì bị đặt position: fixed mà không giữ chỗ cho chiều cao của nó. Triệu chứng:",
  "code": [
   {
    "lang": "HTML",
    "text": "<header>",
    "note": "<header> ở cấp trang chính là banner landmark"
   },
   {
    "lang": "HTML",
    "text": "<nav>",
    "note": "chỉ riêng nhóm liên kết điểm đến"
   },
   {
    "lang": "ARIA",
    "text": "aria-current=\"page\"",
    "note": "đánh dấu liên kết của trang bạn đang ở"
   },
   {
    "lang": "ARIA",
    "text": "role=\"banner\""
   }
  ],
  "see": [
   "web/hamburger-menu",
   "web/sticky-fixed",
   "web/breadcrumbs",
   "macos/menu-bar",
   "web/alert-callout-banner",
   "web/bottom-navigation",
   "web/scroll-effects",
   "web/waffle-menu"
  ]
 },
 "web/hover-card": {
  "lead": "Rê chuột hoặc focus vào tên người dùng",
  "sym": [
   "HoverCard",
   ":hover"
  ],
  "aka": [
   "hover preview",
   "profile preview",
   "preview card"
  ],
  "def": "Hover card là một bản xem trước phong phú gắn với một người, một địa điểm hoặc một đối tượng được liên kết tới. Nó cho thấy nhiều thông tin hơn tooltip và có thể chứa metadata thụ động hoặc một vài hành động, trong khi vẫn để trang bên dưới dùng được. Độ trễ khi mở và đóng của nó phải đủ để con trỏ di chuyển từ trigger vào trong thẻ mà không bị nhấp nháy.",
  "phrases": [
   "bản xem trước hồ sơ khi rê chuột lên tên người dùng",
   "cửa sổ nổi phong phú hiện ra phía trên một liên kết",
   "tấm thẻ người dùng nhỏ hiện ra khi rê chuột",
   "một tooltip có ảnh đại diện và chi tiết",
   "phần xem trước trước khi mở hẳn hồ sơ"
  ],
  "anatomy": [
   {
    "n": "Preview trigger",
    "sym": "HoverCardTrigger",
    "d": "“Tên người dùng làm hiện ra một tấm thẻ khi tôi rê chuột” là preview trigger."
   },
   {
    "n": "Preview content",
    "sym": "HoverCardContent",
    "d": "“Cửa sổ hồ sơ nhỏ nhưng đầy đủ hơn” là preview content."
   }
  ],
  "prompt": "Hãy thêm một hover card bằng Radix HoverCard để xem trước hồ sơ được liên kết, kèm ảnh đại diện và phần tóm tắt. Cho nó hiện ra cả khi rê chuột lẫn khi focus bàn phím sau một độ trễ ngắn, giữ nó mở trong lúc con trỏ băng vào thẻ, và khi thoát thì chạy ngược mượt các transition của opacity và transform.",
  "debug": "Hãy gỡ lỗi hover card của tôi (Radix HoverCard, mouseenter/mouseleave). Loại trừ lần lượt: thẻ đóng lại trong lúc con trỏ đi từ trigger sang thẻ, cần có độ trễ hover-intent hoặc safe-polygon; thiết bị cảm ứng không bao giờ mở được vì không có hover, hãy cung cấp một đường chạm/focus; độ trễ mở/đóng chỉnh ngắn quá nên nháy khi lướt nhanh; thẻ bị kẹt dưới một stacking context khác. Triệu chứng:",
  "code": [
   {
    "lang": "Radix",
    "text": "HoverCard"
   },
   {
    "lang": "CSS",
    "text": ":hover"
   },
   {
    "lang": "HTML",
    "text": "popover"
   },
   {
    "lang": "CSS",
    "text": ":focus-visible"
   }
  ],
  "see": [
   "web/popover-dropdown-tooltip",
   "web/combobox",
   "web/focus-ring-web",
   "macos/popover",
   "web/card",
   "web/avatar-group",
   "web/hover-effects"
  ]
 },
 "web/hover-effects": {
  "lead": "Rê chuột vào từng cái: lớp phủ màu, cú nhấc lên và vầng sáng là ba hiệu ứng hover khác nhau",
  "sym": [
   ":hover",
   "@media (hover: hover)"
  ],
  "aka": [
   "hover effect",
   "hover state",
   "state layer (Material)",
   "spotlight card"
  ],
  "def": "“Khi rê chuột lên một nút thì nó đổi màu” là hover highlight, lớp phủ màu nhạt mà CSS tô bằng :hover (Material gọi nó là state layer). Hai người anh em của nó là: hover lift đẩy một thẻ lên vài pixel và làm bóng bên dưới đậm hơn, còn cursor spotlight là một vòng sáng mềm đi theo con trỏ bên trong thẻ tối, thường làm sáng phần viền gần nó nhất (Magic UI MagicCard, Aceternity Card Spotlight). Màn hình cảm ứng không có hover, nên hãy bảo vệ các hiệu ứng này bằng @media (hover: hover) và đừng bao giờ giấu thông tin sau chúng. Một cửa sổ xem trước hiện ra khi hover là hover card; một nhãn chữ nhỏ là tooltip.",
  "phrases": [
   "khi rê chuột lên một nút thì nó đổi màu",
   "đưa chuột lên là có một vòng sáng hiện ra",
   "nền quanh con trỏ sáng lên",
   "hiệu ứng nổi lên khi chuột chạm vào",
   "tấm thẻ trồi lên một chút khi chuột ở trên nó",
   "vầng sáng mềm đi theo chuột bên trong thẻ tối"
  ],
  "anatomy": [
   {
    "n": "Hover highlight (state layer)",
    "sym": ":hover { background-color }",
    "d": "“Nút đổi màu khi chuột ở trên nó” là hover highlight, một lớp phủ màu nhạt trên hàng hoặc nút."
   },
   {
    "n": "Hover lift",
    "sym": "transform: translateY(-4px) + box-shadow",
    "d": "“Tấm thẻ trồi lên dưới con chuột” là hover lift: nó nhô lên vài pixel và bóng của nó lớn hơn, mềm hơn."
   },
   {
    "n": "Cursor spotlight",
    "sym": "radial-gradient(circle at var(--x) var(--y), …)",
    "d": "“Ánh sáng đi theo chuột trong thẻ” là cursor spotlight, một vầng sáng hướng tâm mềm, đồng thời làm sáng cạnh viền gần nhất."
   }
  ],
  "prompt": "Hãy thêm các hiệu ứng hover, được bảo vệ bằng @media (hover: hover): một hover highlight cho nút và các hàng (lớp phủ nền nhạt khi :hover, 150 ms ease-out), một hover lift cho thẻ (translateY(-4px) cộng với box-shadow lớn hơn và mềm hơn, 200 ms), và một cursor spotlight cho thẻ tối (vầng sáng radial-gradient(circle at var(--x) var(--y), …) mà --x và --y đi theo pointermove, làm sáng viền gần nhất). Đừng bao giờ giấu thông tin sau hover.",
  "debug": "Hãy gỡ lỗi hiệu ứng hover của tôi (:hover, @media (hover: hover), radial-gradient với --x/--y lấy từ pointermove). Loại trừ lần lượt: thẻ rung ở mép dưới vì cú nhấc đẩy nó ra khỏi dưới con trỏ (hãy đặt :hover lên một wrapper đứng yên); trạng thái hover bị dính lại sau khi chạm trên màn hình cảm ứng vì quy tắc không nằm trong @media (hover: hover); vầng sáng nhảy về góc trên bên trái lúc vừa vào vì --x và --y chưa được đặt giá trị ban đầu; spotlight bị trễ vì pointermove kích hoạt render lại của React thay vì gán một biến CSS; thay đổi bóng bị giật vì box-shadow không có trong danh sách transition; lớp màu tint không thấy ở chế độ tối vì nó là lớp phủ đen trên nền đã tối. Triệu chứng:",
  "code": [
   {
    "lang": "CSS",
    "text": ":hover"
   },
   {
    "lang": "CSS",
    "text": "@media (hover: hover)",
    "note": "chỉ áp dụng trên thiết bị có con trỏ thật; hover: của Tailwind cũng dựa vào nó"
   },
   {
    "lang": "CSS",
    "text": "radial-gradient(circle at var(--x) var(--y), …)",
    "note": "chính là spotlight, với --x và --y được gán từ pointermove"
   },
   {
    "lang": "Magic UI",
    "text": "<MagicCard>",
    "note": "gradientSize, gradientColor, gradientOpacity"
   },
   {
    "lang": "SwiftUI",
    "text": ".onHover(perform:)",
    "note": "iOS 13.4+, macOS 10.15+"
   },
   {
    "lang": "AppKit",
    "text": "NSTrackingArea"
   }
  ],
  "see": [
   "web/card",
   "web/hover-card",
   "web/easing"
  ]
 },
 "web/lightbox": {
  "lead": "Ảnh lớn phủ trên trang đã tối đi là lightbox; lớp tối đó là scrim",
  "sym": [
   "<dialog>",
   "::backdrop"
  ],
  "aka": [
   "image viewer overlay",
   "photo modal",
   "gallery overlay"
  ],
  "def": "“Bấm vào bức ảnh là nó mở to ra và mọi thứ phía sau tối đi” là lightbox: một trình xem ảnh dạng modal đặt chồng lên trang. Lớp tối phía sau là scrim, ảnh phóng to nằm giữa sân khấu, và các mũi tên lật qua từng ảnh trong thư viện. Lightbox hiện đại được xây trên phần tử <dialog> gốc và ::backdrop của nó.",
  "phrases": [
   "khi bấm vào một tấm ảnh thì nó mở lớn trên nền tối",
   "cửa sổ ảnh phóng to trong một thư viện ảnh",
   "bấm vào ảnh thu nhỏ là nó phóng ra phủ lên trang",
   "trình xem ảnh có mũi tên để sang ảnh kế",
   "bức ảnh lớn trên nền đen",
   "một mẫu thiết kế để phóng to hình ảnh"
  ],
  "anatomy": [],
  "prompt": "Hãy dựng một lightbox: bấm vào ảnh thu nhỏ trong thư viện thì mở ảnh đầy đủ trong một <dialog> modal (aria-modal) phủ trên lớp scrim ::backdrop tối, có mũi tên trước/sau, nút đóng, đóng bằng Escape hoặc bấm vào backdrop, và một transition fade/scale có thể chạy ngược.",
  "debug": "Hãy gỡ lỗi lightbox của tôi (<dialog>, ::backdrop, lớp phủ ảnh kiểu PhotoSwipe). Loại trừ lần lượt: mở bằng show() thay vì showModal() nên không có backdrop và trang vẫn cuộn phía sau; phím mũi tên vừa lật thư viện vừa cuộn trang cùng lúc; ảnh kích thước đầy đủ chỉ tải sau khi transition kết thúc nên nó nhảy từ mờ sang nét; focus không quay về ảnh thu nhỏ đã bấm khi đóng. Triệu chứng:",
  "code": [
   {
    "lang": "HTML",
    "text": "<dialog>",
    "note": "lớp nền hiện đại cho một lightbox"
   },
   {
    "lang": "CSS",
    "text": "::backdrop"
   },
   {
    "lang": "ARIA",
    "text": "role=\"dialog\" aria-modal=\"true\""
   },
   {
    "lang": "JS libs",
    "text": "PhotoSwipe · GLightbox",
    "note": "các thư viện lightbox làm sẵn"
   }
  ],
  "see": [
   "web/scrim",
   "web/dialog-drawer-sheet",
   "web/masonry",
   "web/carousel"
  ]
 },
 "web/marquee": {
  "lead": "Dải chạy ngang tự động là marquee, rê chuột vào để dừng; phần mờ dần ở hai đầu là edge fade",
  "sym": [
   "animation + @keyframes translateX",
   "<marquee>"
  ],
  "aka": [
   "ticker",
   "logo carousel",
   "auto-scrolling strip"
  ],
  "def": "“Các logo tự trượt ngang qua” là marquee, tức nội dung tự cuộn theo một vòng lặp ngang bất tận, tên gọi này bắt nguồn từ thẻ <marquee> đã bị loại bỏ. Ngày nay nó là một vòng lặp transform bằng CSS chạy trên nội dung được nhân đôi, và hai đầu được làm tan dần bằng edge fade. Riêng Windows thì dùng chữ “marquee” để chỉ kiểu thanh tiến trình không xác định, đó là một thứ khác.",
  "phrases": [
   "các logo tự chạy ngang",
   "dòng chữ chạy tin tức",
   "dải logo cuộn mãi không dứt",
   "chữ tự di chuyển qua màn hình",
   "các logo thương hiệu tự trượt"
  ],
  "anatomy": [
   {
    "n": "Edge fade",
    "sym": "mask-image: linear-gradient(…)",
    "d": "“Các logo mờ dần ở hai đầu dải” là edge fade, đó là một mask chứ không phải một dải gradient được vẽ lên."
   }
  ],
  "prompt": "Hãy dựng một marquee: một dải ngang tự cuộn dùng vòng lặp CSS @keyframes translateX(-50%) chạy trên nội dung được nhân đôi chính xác (tuyệt đối không dùng thẻ <marquee> đã bị loại bỏ), có mask làm mờ ở hai mép, dừng khi rê chuột bằng animation-play-state, và có phương án dự phòng cho prefers-reduced-motion để dừng chuyển động.",
  "debug": "Hãy gỡ lỗi marquee của tôi (vòng lặp keyframe translateX bằng CSS, react-fast-marquee). Loại trừ lần lượt: vòng lặp bị giật ở chỗ nối vì nội dung không được nhân đôi đúng một lần và dịch chuyển đúng -50%; animate left/width trên main thread thay vì dùng transform; thiếu việc dừng khi hover (animation-play-state); chuyển động vẫn chạy khi có prefers-reduced-motion; thẻ <marquee> đã bị loại bỏ bị dán vào từ một đoạn mã cũ. Triệu chứng:",
  "code": [
   {
    "lang": "CSS",
    "text": "animation + @keyframes translateX",
    "note": "cách hiện đại: một vòng lặp transform chạy trên nội dung được nhân đôi"
   },
   {
    "lang": "HTML",
    "text": "<marquee>",
    "note": "đã bị loại bỏ từ lâu, không bao giờ nên đưa vào sản phẩm, nhưng chính nó đặt tên cho mẫu thiết kế này"
   },
   {
    "lang": "React",
    "text": "react-fast-marquee"
   },
   {
    "lang": "CSS",
    "text": "animation-play-state: paused",
    "note": "dừng khi hover"
   }
  ],
  "see": [
   "web/carousel",
   "web/truncation",
   "web/progress-indicators",
   "web/easing",
   "web/text-scramble",
   "web/text-animations"
  ]
 },
 "web/masonry": {
  "lead": "Cùng sáu thẻ: lưới thường để lại khoảng trống dưới các thẻ ngắn, còn masonry xếp khít từng cột, mép dưới so le ở khung bên phải là dấu hiệu nhận biết",
  "sym": [
   "columns",
   "grid-template-rows: masonry"
  ],
  "aka": [
   "waterfall layout",
   "pinterest grid",
   "brick layout"
  ],
  "def": "“Cái lưới kiểu Pinterest mà thẻ nào cũng giữ chiều cao riêng” là masonry layout: mỗi mục mới được xếp vào cột đang ngắn nhất, nên các thẻ khớp vào nhau như gạch xây, không có đường hàng nào và mép dưới so le nhau. Giao diện tiếng Trung gọi nó là 瀑布流 (waterfall flow, dòng thác). Hiện nay CSS columns xấp xỉ được hiệu ứng này ở mọi nơi; masonry gốc (Grid Lanes) đã ra mắt trong Safari 26.",
  "phrases": [
   "lưới kiểu pinterest mà thẻ nào cũng cao thấp khác nhau",
   "ảnh xếp chồng như gạch mà không có khe hở",
   "các cột mà thẻ không thẳng hàng theo từng hàng",
   "bức tường ảnh trong đó mỗi ảnh giữ chiều cao riêng",
   "các thẻ lấp vào dưới nhau thay vì xếp theo hàng"
  ],
  "anatomy": [
   {
    "n": "Packed column",
    "sym": "columns / grid track",
    "d": "“Các thẻ xếp thẳng xuống mà không có gì thẳng hàng theo chiều ngang”: mỗi cột tự dồn khít một cách độc lập, và toàn bộ mẹo nằm ở đó."
   }
  ],
  "prompt": "Hãy dựng một masonry layout (kiểu Pinterest): ưu tiên CSS gốc trước, tức @supports (grid-template-rows: masonry) { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: masonry; }, kèm phương án dự phòng bằng CSS multi-column (columns: 3; mọi thẻ đặt break-inside: avoid). Lưu ý phương án dự phòng sắp thứ tự các mục chạy xuống theo từng cột chứ không phải ngang theo hàng; nếu thứ tự trái sang phải nghiêm ngặt là quan trọng, hãy dùng react-masonry-css. Giữ sẵn tỉ lệ khung hình của ảnh để các thẻ không nhảy trong lúc đang tải.",
  "debug": "Hãy gỡ lỗi masonry layout của tôi (phương án dự phòng CSS columns / grid-template-rows: masonry). Loại trừ lần lượt: thẻ bị cắt đôi giữa hai cột vì thiếu break-inside: avoid; thứ tự mục đọc dọc xuống cột đầu tiên trong khi thiết kế mong đợi thứ tự theo hàng; xuất hiện các hàng cao bằng nhau vì trình duyệt không có masonry gốc mà lại không có phương án dự phòng @supports; bức tường xáo trộn lại khi ảnh tải xong vì width/height chưa được giữ chỗ; margin trên thẻ xung đột với column-gap. Triệu chứng:",
  "code": [
   {
    "lang": "CSS",
    "text": "columns",
    "note": "hiện nay chạy được ở mọi nơi, nhưng các mục chảy XUỐNG theo từng cột chứ không chạy ngang theo hàng"
   },
   {
    "lang": "CSS",
    "text": "grid-template-rows: masonry",
    "note": "bản gốc (Grid Lanes): Safari 26; ở nơi khác năm 2026 vẫn nằm sau cờ thử nghiệm, nên ghép với @supports"
   },
   {
    "lang": "React",
    "text": "react-masonry-css",
    "note": "JS chia thành các chồng theo từng cột khi cần thứ tự theo hàng"
   },
   {
    "lang": "CSS",
    "text": "break-inside: avoid",
    "note": "ngăn thẻ bị cắt đôi giữa các cột trong phương án dự phòng"
   }
  ],
  "see": [
   "web/bento-grid",
   "web/lightbox",
   "web/card"
  ]
 },
 "web/multi-select": {
  "lead": "Đánh dấu một lựa chọn ở bên trái. Con số trong ô đang đóng là selected-value summary",
  "sym": [
   "<select multiple>",
   "aria-multiselectable=\"true\""
  ],
  "aka": [
   "multiselect",
   "multiple select",
   "multi-select dropdown",
   "checkbox dropdown",
   "multi-select listbox",
   "token multi-select",
   "transfer list",
   "pick list",
   "shuttle"
  ],
  "def": "Multi-select là một control giữ nhiều giá trị đã chọn cùng lúc. Cùng một việc nhưng khoác ba bộ mặt: một trigger đóng hiện dòng kiểu 2 selected phía trên danh sách các hàng có checkbox; một ô có tìm kiếm biến mỗi lựa chọn thành một chip có thể gỡ; và một transfer list hai ngăn (còn gọi là dual list selector hay shuttle) với các mũi tên chuyển mục qua lại giữa Available và Selected. Bên dưới cả ba, mẫu truy cập được đều giống nhau: một <select multiple> gốc, hoặc một role=\"listbox\" kèm aria-multiselectable=\"true\" và aria-selected trên từng option. Nếu ô này còn cho người dùng tự tạo ra giá trị hoàn toàn mới thì nó là một tags input, còn biến thể đẩy các hàng đã tick lên đầu một danh sách chỉ là cách sắp xếp selected-first chứ không phải một control riêng.",
  "phrases": [
   "dropdown có các checkbox",
   "dropdown tìm kiếm được, chọn xong thì các mục đi vào thành các chip lọc",
   "một ô select mà còn cho tick chọn nhiều mục",
   "danh sách bản ghi kèm checkbox",
   "dual list selector",
   "bộ chọn cho người dùng chọn nhiều bản ghi và các bản ghi đã tick thì chuyển lên đầu danh sách",
   "bộ chọn nhiều giá trị"
  ],
  "anatomy": [
   {
    "n": "Selected-value summary",
    "sym": "Select.ValueText",
    "d": "“Dòng chữ trong dropdown ghi 2 selected” là selected-value summary."
   },
   {
    "n": "Option checkbox (selected-option indicator)",
    "sym": "role=\"option\" aria-selected=\"true\"",
    "d": "“Mấy ô vuông nhỏ cạnh từng mục của dropdown” là option checkbox, dạng được vẽ ra của aria-selected."
   },
   {
    "n": "Selected token and its remove button",
    "sym": "TagsInput.Item / TagsInput.ItemDeleteTrigger",
    "d": "“Những viên thuốc lọc nhỏ hiện ra sau khi tôi chọn, mỗi viên có một dấu x” là các selected token và nút gỡ của chúng."
   },
   {
    "n": "Source and target lists",
    "sym": "<Transfer dataSource targetKeys>",
    "d": "“Hai cái hộp, bên trái là những thứ còn có thể chọn, bên phải là những thứ đã chọn” là source list và target list của một transfer list."
   },
   {
    "n": "Transfer actions (move buttons)",
    "sym": "Transfer actions",
    "d": "“Các nút mũi tên giữa hai cái hộp” là transfer actions."
   }
  ],
  "prompt": "Hãy dựng một Multi-select với role=\"listbox\" và aria-multiselectable=\"true\": mở nó từ một trigger gọn hiển thị số mục đã chọn, giữ danh sách option có tìm kiếm luôn mở trong khi nhiều hàng role=\"option\" bật/tắt aria-selected, hiển thị mỗi giá trị đã chọn thành một chip có thể gỡ, và tách riêng focus bàn phím khỏi việc chọn. Với biến thể hai ngăn, hãy dùng Ant Transfer có hai ngăn đặt tiêu đề Available và Selected, targetKeys cho các mục đã chọn, và các nút di chuyển bị vô hiệu khi không có mục hợp lệ nào được tick.",
  "debug": "Hãy gỡ lỗi multi-select của tôi (<select multiple>, MUI Autocomplete multiple, Ant Select mode=\"multiple\", role=\"listbox\" aria-multiselectable). Loại trừ lần lượt: popup đóng sau lần chọn đầu tiên vì click vào option vẫn chạy một handler đóng-khi-chọn viết cho select một giá trị; lựa chọn được giữ dưới dạng mảng nhưng so sánh theo danh tính đối tượng, nên các option được render lại mất vẻ đã tick; số đếm trên trigger lấy từ nguồn khác với danh sách option nên bị lỗi thời; checkbox được vẽ và aria-selected lệch nhau, khiến trình đọc màn hình đọc ngược với điều hiện trên màn hình; lọc danh sách âm thầm làm rơi các giá trị đã chọn nhưng không còn nhìn thấy; nút gỡ của token cướp focus hoặc mở lại popup thay vì chỉ gỡ đúng một giá trị đó; các nút di chuyển của transfer list vẫn bật trong khi không có mục hợp lệ nào được tick. Triệu chứng:",
  "code": [
   {
    "lang": "HTML",
    "text": "<select multiple>",
    "note": "primitive gốc; đọc các option đã chọn từ HTMLSelectElement.selectedOptions"
   },
   {
    "lang": "ARIA",
    "text": "aria-multiselectable=\"true\"",
    "note": "trạng thái định nghĩa trên một role=\"listbox\" tự tạo có thể giữ nhiều hơn một option được chọn"
   },
   {
    "lang": "ARIA",
    "text": "role=\"option\" aria-selected",
    "note": "trạng thái chọn trên từng option; APG cảnh báo rằng focus không phải là việc chọn"
   },
   {
    "lang": "Material UI",
    "text": "<Autocomplete multiple>",
    "note": "dạng có tìm kiếm; renderValue vẽ mỗi giá trị đã chọn thành một chip"
   },
   {
    "lang": "Ant Design",
    "text": "<Select mode=\"multiple\">",
    "note": "kèm showSearch và tagRender; mode=\"tags\" là chế độ khác, cho phép tạo giá trị mới"
   },
   {
    "lang": "Chakra UI",
    "text": "<Select.Root multiple>",
    "note": "Select.Trigger giữ Select.ValueText, phần tóm tắt lựa chọn"
   },
   {
    "lang": "Ant Design",
    "text": "<Transfer targetKeys>",
    "note": "kiểu con hai ngăn; actions render các nút di chuyển giữa hai danh sách"
   },
   {
    "lang": "Chakra UI",
    "text": "TagsInput.ItemDeleteTrigger",
    "note": "dấu x bên trong một token đã chọn"
   }
  ],
  "see": [
   "web/combobox",
   "web/switch-checkbox-radio",
   "web/badge-chip-pill",
   "macos/token-field"
  ]
 },
 "web/pagination": {
  "lead": "Bấm một con số: số được tô sáng mang aria-current=\"page\"; dấu … là ellipsis, còn các chấm tròn là một page control",
  "sym": [
   "<nav aria-label=\"pagination\">",
   "aria-current=\"page\""
  ],
  "aka": [
   "pager",
   "paging controls",
   "page navigation",
   "page numbers",
   "page control"
  ],
  "def": "“Các nút đánh số ở cuối danh sách” là pagination, một nav landmark gồm các liên kết số trang, trong đó trang hiện tại được đánh dấu aria-current=\"page\". Dấu “…” nằm chen giữa các con số là ellipsis (chỉ báo phần bị ẩn), còn hàng chấm nhỏ trên một khung nhìn vuốt được thì có tên riêng: page control (UIPageControl trên các nền tảng Apple; trên carousel web thì là bộ chọn slide). Nếu danh sách cứ dài ra khi bạn cuộn thì đó là infinite scroll, và nút “Load more” là họ hàng của nó; pagination là kiểu có các trang đánh số và có địa chỉ riêng.",
  "phrases": [
   "phân trang cho datatable",
   "số trang cho các bảng",
   "các nút đánh số ở cuối danh sách",
   "trước 1 2 3 sau",
   "ba chấm nằm giữa các số trang",
   "những chấm nhỏ cho biết bạn đang ở trang nào"
  ],
  "anatomy": [
   {
    "n": "Page-number links",
    "sym": "aria-current=\"page\"",
    "d": "“Các nút 1 2 3” là page-number links: liên kết (hoặc nút) thật, mỗi trang một cái, trong đó có đúng một cái mang aria-current=\"page\" để chỉ trang hiện tại."
   },
   {
    "n": "Previous / next links",
    "sym": "<PaginationPrevious />",
    "d": "“Mũi tên lùi và tiến ở hai đầu” là previous/next links; chúng nhích một trang và bị vô hiệu hóa (hoặc ẩn) ở trang đầu và trang cuối."
   },
   {
    "n": "Ellipsis (overflow indicator)",
    "sym": "<PaginationEllipsis />",
    "d": "“Ba chấm giữa các con số” là ellipsis, một vật thay thế không tương tác cho dải trang đã bị thu gọn (văn bản cho trình đọc màn hình: “More pages”)."
   },
   {
    "n": "Page dots (page control)",
    "sym": "UIPageControl",
    "d": "“Những chấm nhỏ bên dưới một khung nhìn vuốt được” là page control: mỗi trang một chỉ báo, chấm đặc đánh dấu trang hiện tại (UIPageControl; .tabViewStyle(.page) trong SwiftUI)."
   }
  ],
  "prompt": "Hãy dựng phân trang cho danh sách này: một landmark <nav aria-label=\"pagination\"> chứa các liên kết số trang với trang hiện tại được đánh dấu aria-current=\"page\", các liên kết previous/next ở hai đầu, và một ellipsis (…) thế chỗ cho dải đã thu gọn (<Pagination> của shadcn/ui cùng PaginationEllipsis). Giữ số trang hiển thị tính từ 1 và chuyển sang offset tính từ 0 ở đúng một nơi; mỗi khi bộ lọc, tổng số hay kích thước trang thay đổi, hãy tính lại tổng số trang và kẹp trang hiện tại vào khoảng hợp lệ.",
  "debug": "Hãy gỡ lỗi phân trang của tôi (aria-current=\"page\", logic cửa sổ ellipsis, state của trang). Loại trừ lần lượt: chỉ số trang tính từ 0 và tính từ 1 bị trộn lẫn ở một ranh giới (URL, state của component, offset của API) thay vì được chuyển đổi ở một nơi duy nhất; trang hiện tại nằm ngoài khoảng hợp lệ sau khi đổi bộ lọc hoặc kích thước trang (hãy kẹp lại khi tổng thay đổi); logic cửa sổ ellipsis giấu một trang dù tất cả các trang vẫn vừa đủ chỗ, hoặc hiện … cho chỉ một trang bị ẩn (hãy thử các tổng ngay dưới, đúng bằng và ngay trên ngưỡng cắt bớt); con số được tô sáng thiếu aria-current=\"page\" nên trình đọc màn hình chỉ đọc \"3, link\"; các chấm trang lệch với nội dung vì chấm và slide theo dõi hai chỉ số khác nhau. Triệu chứng:",
  "code": [
   {
    "lang": "HTML",
    "text": "<nav aria-label=\"pagination\">",
    "note": "công thức của MDN: một nav landmark chứa danh sách các liên kết trang"
   },
   {
    "lang": "ARIA",
    "text": "aria-current=\"page\"",
    "note": "đánh dấu MỘT liên kết trang hiện tại"
   },
   {
    "lang": "shadcn/ui",
    "text": "<Pagination />",
    "note": "cùng PaginationPrevious / PaginationEllipsis / PaginationNext"
   },
   {
    "lang": "UIKit",
    "text": "UIPageControl",
    "note": "tên mà Apple đặt cho hàng chấm trang"
   },
   {
    "lang": "SwiftUI",
    "text": ".tabViewStyle(.page)",
    "note": "một TabView chia trang hiện chỉ mục dạng chấm"
   }
  ],
  "see": [
   "web/carousel",
   "web/tabs",
   "web/truncation",
   "web/steps",
   "web/data-table"
  ]
 },
 "web/parallax": {
  "lead": "Cuộn bên trong cảnh (hoặc chỉ cần nhìn): một lần cuộn, ba tốc độ là 0.15×, 0.45×, 1×. Độ trễ giữa các lớp chính là parallax.",
  "sym": [
   "animation-timeline: scroll()",
   "perspective + translateZ() + scale()"
  ],
  "aka": [
   "parallax effect",
   "parallax background",
   "scroll-linked depth effect",
   "fixed background"
  ],
  "def": "“Nền di chuyển chậm hơn trang” là parallax scrolling: các lớp tịnh tiến với tốc độ khác nhau khi bạn cuộn, tạo ảo giác về chiều sâu. Nếu ảnh hoàn toàn không động đậy và nội dung chỉ trượt qua phía trên nó thì đó là biến thể fixed-background (background-attachment: fixed, nổi tiếng là bị iOS Safari phớt lờ), và một phần tử đứng yên trong khi phần còn lại cuộn qua nó là position: sticky, không phải parallax. Động cơ hiện đại là scroll-driven animation: animation-timeline: scroll() ánh xạ thẳng vị trí cuộn thành tiến độ của animation.",
  "phrases": [
   "hiệu ứng ảnh nằm phía sau trang web",
   "hiệu ứng parallax toàn trang",
   "parallax",
   "nền di chuyển chậm hơn trang khi cuộn",
   "ảnh đứng yên trong khi nội dung cuộn qua phía trên",
   "hiệu ứng chiều sâu 3D khi cuộn"
  ],
  "anatomy": [
   {
    "n": "Background layer",
    "sym": "translateZ(-1px) scale(2)",
    "d": "“Bức ảnh phía sau cứ chậm hơn” là background layer, mặt phẳng xa di chuyển với một phần nhỏ tốc độ cuộn; mẹo CSS là đẩy nó lùi ra sau bằng translateZ(-1px) rồi phóng to lại cho vừa khung."
   },
   {
    "n": "Foreground layer",
    "sym": "translateZ(0)",
    "d": "“Nội dung cuộn bình thường phía trên nó” là foreground layer, mặt phẳng gần di chuyển đúng bằng tốc độ cuộn, và chính điều này khiến nền bị chậm nhìn ra thành chiều sâu."
   }
  ],
  "prompt": "Hãy dựng một phần parallax scrolling: chiều sâu nhiều lớp, trong đó lớp nền tịnh tiến chậm hơn lớp trước khi người dùng cuộn. Điều khiển nó bằng scroll-driven animations của CSS (animation-timeline: scroll(), khai báo SAU shorthand animation, vì nếu không shorthand sẽ đặt lại nó) hoặc bằng useScroll + useTransform của Motion từ \"motion/react\"; chỉ animate transform/opacity. Không dùng background-attachment: fixed, vì iOS Safari bỏ qua nó theo chủ đích. Bọc toàn bộ hiệu ứng trong @media (prefers-reduced-motion: reduce) và quay về kiểu cuộn thông thường; parallax là tác nhân kích hoạt rối loạn tiền đình đã được biết đến.",
  "debug": "Hãy gỡ lỗi parallax scrolling của tôi (scroll-driven animation / mẹo perspective / ScrollTrigger). Loại trừ lần lượt: giật vì tính toán layout trong handler cuộn hoặc vì animate background-position thay cho transform; background-attachment: fixed bị iOS Safari âm thầm bỏ qua (theo chủ đích, hãy dùng một lớp sticky hoặc lớp có transform thay thế); các phần tử con position: fixed bị hỏng vì một tổ tiên có perspective/transform trở thành containing block của chúng; scroll-driven animation không bao giờ bắt đầu vì animation-timeline được khai báo trước shorthand animation hoặc vì scroller không có overflow cuộn được; tràn ngang phát sinh từ phần bù scale của mẹo perspective; hiệu ứng vẫn chuyển động khi có prefers-reduced-motion: reduce. Triệu chứng:",
  "code": [
   {
    "lang": "CSS",
    "text": "animation-timeline: scroll()",
    "note": "scroll-driven animation, tiến độ đi theo thanh cuộn; khai báo SAU shorthand animation"
   },
   {
    "lang": "CSS",
    "text": "perspective + translateZ() + scale()",
    "note": "mẹo chiều sâu thuần CSS kinh điển, với scale = 1 + (−z / perspective)"
   },
   {
    "lang": "Motion",
    "text": "useScroll + useTransform",
    "note": "import từ \"motion/react\" (thư viện trước đây tên là framer-motion)"
   },
   {
    "lang": "GSAP",
    "text": "ScrollTrigger",
    "note": "{ scrub: true } gắn tiến độ tween với tiến độ cuộn"
   },
   {
    "lang": "CSS",
    "text": "background-attachment: fixed",
    "note": "anh em giả dạng của fixed-background, vẫn bị iOS Safari bỏ qua theo chủ đích"
   }
  ],
  "see": [
   "web/sticky-fixed",
   "web/easing",
   "web/spring",
   "web/scroll-effects"
  ]
 },
 "web/pie-donut-chart": {
  "lead": "Biểu đồ tròn pie đặc ở giữa, còn donut thì có lỗ",
  "sym": [
   "SectorMark",
   "type: 'doughnut'"
  ],
  "aka": [
   "doughnut chart",
   "ring chart",
   "circle graph",
   "sector chart"
  ],
  "def": "“Một vòng tròn chia thành các lát” là pie chart; khoét một lỗ ở giữa thì nó thành donut chart (Swift Charts dùng SectorMark với innerRadius, Chart.js dùng type 'doughnut'). Cả hai đều cho thấy các phần cấu thành một tổng thể như thế nào, chẳng hạn nguồn truy cập hoặc dung lượng đĩa, và lỗ của donut thường chứa tổng số hoặc giá trị của lát nằm dưới con trỏ. Những khe hở mỏng giữa các lát giữ cho các lát cạnh nhau tách bạch. Nó không phải gauge (nửa vòng có kim chỉ một số đo) hay progress ring (một giá trị lấp đầy vòng tròn); khi quá năm hay sáu lát thì bar chart so sánh kích cỡ tốt hơn.",
  "phrases": [
   "biểu đồ hình tròn có một lỗ ở giữa",
   "biểu đồ tròn cắt thành các lát màu như cái bánh pizza",
   "con số nằm trong lỗ của biểu đồ tròn",
   "những đường trắng mảnh giữa các lát",
   "các chấm màu kèm tên nằm cạnh biểu đồ",
   "biểu đồ cho thấy mỗi phần chiếm bao nhiêu tỉ lệ của tổng thể"
  ],
  "anatomy": [
   {
    "n": "Slice (sector)",
    "sym": "SectorMark",
    "d": "“Một mảnh màu của vòng tròn” là slice, còn gọi là sector hay wedge."
   },
   {
    "n": "Center label",
    "sym": "",
    "d": "“Con số nằm trong lỗ” là center label: tổng số, hoặc giá trị của lát nằm dưới con trỏ."
   },
   {
    "n": "Slice gap (padding angle)",
    "sym": "paddingAngle",
    "d": "“Những đường trắng mảnh giữa các lát” là slice gap, được đặt bằng paddingAngle của Recharts hoặc angularInset của Swift Charts."
   },
   {
    "n": "Legend",
    "sym": "",
    "d": "“Các chấm màu kèm tên cạnh biểu đồ” là legend, bảng chú giải cho biết màu nào ứng với phần nào."
   }
  ],
  "prompt": "Hãy dựng một donut chart (SectorMark của Swift Charts với innerRadius; <Pie innerRadius paddingAngle> của Recharts) cho các phần của một tổng thể: bốn hoặc năm lát, khe hở mỏng đều giữa các lát, tổng số nằm trong lỗ, và một legend cùng màu, cùng thứ tự. Rê chuột lên một lát hoặc hàng tương ứng của nó trong legend thì lát đó trồi ra và giá trị của nó hiện ở giữa. Không dùng 3D, và không quá sáu lát.",
  "debug": "Hãy gỡ lỗi biểu đồ pie hoặc donut của tôi (Chart.js doughnut / Recharts Pie / Swift Charts SectorMark). Loại trừ lần lượt: lát đầu tiên bắt đầu ở vị trí 3 giờ thay vì 12 giờ do góc bắt đầu; không có lỗ vì innerRadius hoặc cutout bằng 0; màu trong legend không khớp với các lát vì danh sách màu theo thứ tự khác; nhãn ở giữa bị lệch tâm vì nó được định vị theo thẻ chứa chứ không theo biểu đồ; các lát không cộng lại thành tổng thể vì giá trị chưa được chuẩn hóa; những lát rất nhỏ có nhãn chồng lên nhau. Triệu chứng:",
  "code": [
   {
    "lang": "Swift Charts",
    "text": "SectorMark",
    "note": "macOS 14+ và iOS 17+; innerRadius tạo lỗ, angularInset tạo các khe hở"
   },
   {
    "lang": "Chart.js",
    "text": "type: 'doughnut'",
    "note": "cutout đặt kích cỡ lỗ; type: 'pie' thì không có"
   },
   {
    "lang": "Recharts",
    "text": "<Pie innerRadius paddingAngle>",
    "note": "innerRadius bằng 0 là biểu đồ pie"
   },
   {
    "lang": "Material UI",
    "text": "<PieChart>",
    "note": "MUI X Charts; innerRadius biến nó thành donut"
   },
   {
    "lang": "CSS",
    "text": "conic-gradient()",
    "note": "một biểu đồ pie thuần CSS; trình đọc màn hình không đọc được"
   }
  ],
  "see": [
   "web/progress-indicators",
   "macos/level-indicator",
   "web/data-table",
   "web/bento-grid"
  ]
 },
 "web/popover-dropdown-tooltip": {
  "lead": "Cập nhật lần cuối hôm nay",
  "sym": [
   "popover",
   "role=\"tooltip\""
  ],
  "aka": [
   "popup",
   "menu",
   "hover hint",
   "toggletip"
  ],
  "def": "Popover mở ra khi bấm và có thể chứa văn bản phong phú, các control hoặc form; nó ở lại cho đến khi bị đóng một cách tường minh hoặc từ bên ngoài. Dropdown menu cũng mở ra khi bấm, nhưng trình bày một danh sách hành động điều hướng được bằng bàn phím và thông thường đóng lại sau khi chọn. Tooltip là một nhãn ngắn, không tương tác, hiện ra khi hover hoặc khi có focus bàn phím và biến mất khi rời khỏi hoặc mất focus ở trigger đó.",
  "phrases": [
   "cái hộp nhỏ gắn vào một nút",
   "danh sách mở ra dưới một nút menu",
   "nhãn hiện ra khi rê chuột lên",
   "một cửa sổ nổi có các control bên trong",
   "lời giải thích bé xíu cạnh một icon",
   "menu hiện ra khi bấm vào ba chấm"
  ],
  "anatomy": [
   {
    "n": "Overlay trigger",
    "sym": "popovertarget",
    "d": "“Cái nút mà cái hộp nhỏ được gắn vào” là overlay trigger."
   },
   {
    "n": "Menu selection highlight",
    "sym": "role=\"menuitem\"",
    "d": "“Dải nền phía sau hành động của dropdown mà các phím mũi tên đang trỏ tới” là menu selection highlight."
   },
   {
    "n": "Tooltip arrow",
    "sym": "Tooltip.Arrow",
    "d": "“Mũi nhọn bé xíu hướng nhãn hover về phía icon” là tooltip arrow."
   }
  ],
  "prompt": "Hãy dùng thuộc tính popover của HTML cho lớp phủ phong phú được kích hoạt bằng click, role=\"menu\" cho danh sách hành động điều hướng được bằng bàn phím, và role=\"tooltip\" chỉ cho gợi ý hover hoặc focus ngắn, không tương tác. Liên kết tooltip từ trigger của nó bằng aria-describedby, giữ mọi lớp phủ neo vào trigger của mình, và cài đặt đúng hành vi Escape, click ra ngoài và đóng khi mất focus cho từng mẫu.",
  "debug": "Hãy gỡ lỗi popover/dropdown/tooltip của tôi (Popover API, Radix, floating-ui). Loại trừ lần lượt: chọn nhầm primitive, vì tooltip chỉ dùng cho hover và focus và không bao giờ chứa nội dung tương tác; panel bị cắt bởi một tổ tiên có overflow thay vì được portal ra body hoặc dùng Popover API ở top layer; thiếu middleware flip/shift nên nó tràn ra ở các mép viewport; click ra ngoài đóng nó trước khi cú click bên trong kịp được ghi nhận. Triệu chứng:",
  "code": [
   {
    "lang": "HTML",
    "text": "popover"
   },
   {
    "lang": "ARIA",
    "text": "role=\"tooltip\""
   },
   {
    "lang": "ARIA",
    "text": "role=\"menu\""
   },
   {
    "lang": "Radix",
    "text": "Popover"
   },
   {
    "lang": "Radix",
    "text": "DropdownMenu"
   },
   {
    "lang": "Radix",
    "text": "Tooltip"
   }
  ],
  "see": [
   "web/dialog-drawer-sheet",
   "web/hover-card",
   "macos/context-menu",
   "macos/popover",
   "web/date-picker",
   "web/chat-bubble",
   "web/waffle-menu",
   "web/product-tour",
   "web/cascading-menus"
  ]
 },
 "web/product-tour": {
  "lead": "Bấm Next: lỗ được chiếu sáng là spotlight; chấm nhấp nháy ở góc của nó là beacon",
  "sym": [
   "<Tour>",
   "driver()"
  ],
  "aka": [
   "guided tour",
   "onboarding tour",
   "walkthrough",
   "feature tour",
   "feature discovery (Material)",
   "app tour"
  ],
  "def": "“Trang tối sầm trừ một cái nút, với một bong bóng nhỏ chỉ vào nó” là product tour, còn gọi là coach marks: một buổi hướng dẫn lần chạy đầu tiên, được dựng bằng các thư viện như Tour của Ant Design hay driver.js. Một lớp mờ phủ lên ứng dụng trừ một spotlight bo tròn quanh một control, và một bong bóng neo vào đó giải thích control ấy, đếm số bước (“2 of 4”) và đưa ra Back, Next cùng Skip; một beacon nhấp nháy có thể đánh dấu chỗ cần bấm. Tooltip hiện khi hover còn modal nằm giữa màn hình; TipKit của Apple chỉ hiển thị một mẹo, không phải một tour.",
  "phrases": [
   "trang tối sầm trừ một cái nút, có một bong bóng nhỏ chỉ vào nó",
   "hướng dẫn từng bước đặt phủ lên giao diện",
   "một lớp phủ màu xám nhạt cùng vài dòng chữ được làm nổi",
   "những hiệu ứng động hình tròn lớn bao quanh một nút",
   "bài hướng dẫn tô sáng từng thứ một kèm nút next",
   "hiệu ứng chuyển động giới thiệu cho người dùng ngay lần đầu vào ứng dụng"
  ],
  "anatomy": [
   {
    "n": "Spotlight (cut-out)",
    "sym": "stagePadding, stageRadius (driver.js)",
    "d": "“Cái lỗ sáng quanh nút” là spotlight: một ô khoét bo tròn trong lớp mờ, có đệm bao quanh đích (không phải ô tìm kiếm của máy Mac, cũng không phải vầng sáng đi theo con trỏ)."
   },
   {
    "n": "Tour bubble",
    "sym": "steps[].popover (driver.js)",
    "d": "“Tấm thẻ nhỏ có mũi tên chỉ vào nút” là tour bubble: ứng dụng là bên mở nó chứ không phải con trỏ của bạn, và nó ở lại cho đến khi bước đổi."
   },
   {
    "n": "Step counter",
    "sym": "showProgress (driver.js)",
    "d": "“Dòng 2 of 4 ở góc bài hướng dẫn” là step counter; một số thư viện vẽ nó thành một hàng chấm, và đó vẫn là cùng một bộ phận."
   },
   {
    "n": "Beacon",
    "sym": "CoachmarkBeacon (Carbon for IBM Products)",
    "d": "“Hiệu ứng động hình tròn lớn bao quanh một nút” là beacon: một chấm nhỏ có vòng lan rộng rồi mờ dần để nói “bấm vào đây”; còn nhịp ping của chấm trạng thái thì lại có nghĩa là “online”."
   }
  ],
  "prompt": "Hãy thêm một product tour (Tour của Ant Design; driver() của driver.js): làm mờ trang khoảng 50% đen và khoét một spotlight bo tròn quanh từng đích một với khoảng 10px đệm, cùng một bong bóng được neo vào đó bằng một mũi tên, bộ đếm bước dạng “2 of 4” và các nút Back, Next và Skip. Cho spotlight và bong bóng lướt sang từng đích kế tiếp. Tuyệt đối không dựng nó như một tooltip hover hay một modal đặt giữa màn hình.",
  "debug": "Hãy gỡ lỗi product tour của tôi (react-joyride Joyride, driver.js driver(), Ant Design Tour). Loại trừ lần lượt: spotlight chỉ được đo một lần nên trôi lệch sau khi cuộn, đổi kích thước hay layout dịch chuyển; đích chưa có trên trang khi bước của nó bắt đầu nên bong bóng rơi vào giữa màn hình; header sticky, tổ tiên có transform hoặc modal có z-index cao hơn che mất lớp mờ; đích không bấm xuyên qua lỗ được (blockTargetInteraction, canClickTarget hay pointer-events); mũi tên vẫn chỉ vào đích trước vì không được căn lại khi đổi bước; đích nằm trong một container cuộn mà không bao giờ cuộn tới vùng nhìn thấy; click vào vùng mờ mặc định đóng cả tour; tour khởi động lại ở mỗi lần ghé thăm vì trạng thái “đã xem” không bao giờ được lưu. Triệu chứng:",
  "code": [
   {
    "lang": "Ant Design",
    "text": "<Tour>",
    "note": "steps[].target là control mà mỗi bước làm sáng lên"
   },
   {
    "lang": "driver.js",
    "text": "driver()",
    "note": "showProgress in ra “2 of 4”; stagePadding và stageRadius định hình cái lỗ"
   },
   {
    "lang": "react-joyride",
    "text": "<Joyride>",
    "note": "continuous thêm nút Next; skipBeacon ẩn chấm nhấp nháy của nó"
   },
   {
    "lang": "Shepherd",
    "text": "new Shepherd.Tour()",
    "note": "useModalOverlay khoét ô mở quanh attachTo.element"
   },
   {
    "lang": "Intro.js",
    "text": "introJs.tour()",
    "note": "lời gọi introJs() cũ đã bị khuyến cáo bỏ"
   },
   {
    "lang": "SwiftUI",
    "text": ".popoverTip(_:arrowEdge:action:)",
    "note": "chỉ một mẹo, không phải một tour; macOS 14+"
   }
  ],
  "see": [
   "web/scrim",
   "web/popover-dropdown-tooltip",
   "web/steps",
   "web/status-dot",
   "web/dialog-drawer-sheet"
  ]
 },
 "web/progress-indicators": {
  "lead": "đường ray ở sau, phần lấp đầy ở trên",
  "sym": [
   "<progress>",
   "ProgressView"
  ],
  "aka": [
   "circular progress indicator",
   "loading spinner",
   "determinate progress indicator",
   "linear progress indicator"
  ],
  "def": "Spinner quay vòng liên tục mà không cho biết còn lại bao nhiêu việc. Determinate progress ring lấp đầy một cung quanh vòng tròn, còn linear progress bar lấp đầy dọc theo một đường ray; cả hai biểu diễn một giá trị đã biết. Nhãn phần trăm có thể làm giá trị ấy chính xác, nhưng nó phải khớp với giá trị tiến trình mà công nghệ hỗ trợ đọc được của chỉ báo.",
  "phrases": [
   "cái vòng tròn đếm ngược, cái vòng cứ đầy dần lên",
   "thanh tiến trình hình tròn đúng nghĩa",
   "vòng được lấp đầy giống như thanh menu",
   "cái vòng đầy dần lên",
   "vòng tròn quay trong lúc đang tải",
   "thanh cho thấy tiến độ đã đi tới đâu"
  ],
  "anatomy": [
   {
    "n": "Indeterminate spinner",
    "sym": "role=\"progressbar\"",
    "d": "Vòng tròn quay mãi không ngừng là indeterminate spinner: nó báo rằng việc đang diễn ra, chứ không cho biết còn lại bao nhiêu."
   },
   {
    "n": "Determinate progress ring",
    "sym": "aria-valuenow",
    "d": "“Cái vòng đầy dần lên” là determinate progress ring: cung tròn của nó biểu diễn một giá trị hoàn thành đã biết."
   },
   {
    "n": "Linear progress bar",
    "sym": "<progress>",
    "d": "Thanh lấp đầy từ phía này sang phía kia là linear progress bar; hãy dùng <progress> khi giá trị của nó đã biết."
   },
   {
    "n": "Progress track",
    "sym": "<progress>",
    "d": "Đường ray chưa được lấp đầy nằm sau progress ring hoặc thanh là track; nó thể hiện toàn bộ phạm vi của chỉ báo."
   },
   {
    "n": "Percentage label",
    "sym": "aria-valuenow",
    "d": "Con số nằm cạnh hoặc bên trong chỉ báo là percentage label, một cách phát biểu dễ đọc cho giá trị tiến trình hiện tại."
   }
  ],
  "prompt": "Hãy dùng đúng loại Progress Indicator: indeterminate spinner khi chưa biết còn bao nhiêu việc, determinate progress ring khi cần một cung tròn gọn lấp đầy dần tới lúc hoàn thành, hoặc thanh tuyến tính <progress> của HTML khi có chỗ cho một đường ray dễ đọc. Với chỉ báo tự làm, hãy dùng role=\"progressbar\" cùng aria-valuenow, và phơi bày mọi phần trăm đang hiển thị thành cùng giá trị mà công nghệ hỗ trợ đọc được; họ hàng của nó trong SwiftUI là ProgressView.",
  "debug": "Hãy gỡ lỗi progress indicator của tôi (role=progressbar, aria-valuenow, spinner). Loại trừ lần lượt: dùng indeterminate spinner ở nơi có thể dùng thanh determinate (hoặc ngược lại); chiều rộng thanh không chạy animation vì transition đặt nhầm thuộc tính; cờ loading bị kẹt ở true nên spinner không bao giờ dừng; aria-valuenow không bao giờ cập nhật nên công nghệ hỗ trợ nghe 0 phần trăm mãi mãi. Triệu chứng:",
  "code": [
   {
    "lang": "HTML",
    "text": "<progress>"
   },
   {
    "lang": "SwiftUI",
    "text": "ProgressView"
   },
   {
    "lang": "ARIA",
    "text": "role=\"progressbar\""
   },
   {
    "lang": "ARIA",
    "text": "aria-valuenow"
   }
  ],
  "see": [
   "web/skeleton-spinner",
   "web/marquee",
   "web/steps",
   "web/status-dot",
   "web/timeline",
   "web/pie-donut-chart"
  ]
 },
 "web/resize-handle": {
  "lead": "Kéo ba đường chéo ở góc dưới bên phải của hộp, đó là size grip",
  "sym": [
   "resize",
   "::-webkit-resizer"
  ],
  "aka": [
   "size grip",
   "resize grip",
   "gripper",
   "resizer",
   "drag corner"
  ],
  "def": "“Ba đường chéo nhỏ ở góc dưới bên phải của một ô văn bản” là resize handle, hay size grip: góc có khía mà bạn kéo để đổi kích thước hộp. Trình duyệt tự thêm nó vào <textarea>; thuộc tính CSS resize điều khiển nó còn ::-webkit-resizer tạo kiểu cho chính điểm ảnh đó. Đừng nhầm nó với textarea tự lớn lên (field-sizing: content), vì đó là một hành vi chứ không có điểm ảnh nào để nắm, hay với các tay nắm chọn hình vuông trong một trình soạn thảo canvas, thứ nằm ở trang Drag and Drop.",
  "phrases": [
   "ba đường chéo nhỏ ở góc dưới bên phải của một ô văn bản",
   "cái ở góc mà bạn kéo để làm ô văn bản lớn ra",
   "những sọc chéo nhỏ ở góc của một ô bình luận",
   "góc kéo của một textarea",
   "cái góc để nắm ở một ô nhập"
  ],
  "anatomy": [
   {
    "n": "Size grip",
    "sym": "::-webkit-resizer",
    "d": "“Những sọc chéo nhỏ” chính là size grip, tam giác có khía ở góc mà nhiệm vụ duy nhất của nó là để người ta nắm lấy."
   }
  ],
  "prompt": "Hãy tạo kiểu cho resize handle (size grip) của textarea của tôi: góc có khía chéo mà trình duyệt thêm vào theo mặc định. Điều khiển nó bằng CSS resize (dùng resize: vertical để việc kéo không thể phá bố cục theo chiều ngang, resize: none để bỏ nó), đặt các giới hạn min-height/max-height, và tạo kiểu cho chính grip bằng ::-webkit-resizer ở nơi được hỗ trợ.",
  "debug": "Hãy gỡ lỗi resize handle của textarea tôi (CSS resize, ::-webkit-resizer). Loại trừ lần lượt: grip biến mất vì đã đặt resize: none hoặc overflow: visible (grip cần overflow khác visible); việc kéo làm vỡ bố cục vì cho phép resize: both ở nơi chủ định là resize: vertical và không có giới hạn max-width/max-height; grip không thấy trên giao diện tối vì ::-webkit-resizer chưa được tạo kiểu lại; Firefox bỏ qua ::-webkit-resizer (nó tự vẽ grip riêng, đừng dựa vào việc tạo kiểu cho nó). Triệu chứng:",
  "code": [
   {
    "lang": "CSS",
    "text": "resize",
    "note": "resize: vertical giữ cho textarea không phá bố cục theo chiều ngang"
   },
   {
    "lang": "CSS",
    "text": "::-webkit-resizer",
    "note": "chính điểm ảnh của grip, tạo kiểu được trong WebKit/Blink"
   },
   {
    "lang": "HTML",
    "text": "<textarea>",
    "note": "mặc định trong hầu hết trình duyệt sẽ mọc ra grip"
   },
   {
    "lang": "CSS",
    "text": "field-sizing: content",
    "note": "phương án thay thế TỰ lớn lên, là hành vi chứ không phải điểm ảnh này"
   }
  ],
  "see": [
   "web/form-field",
   "web/drag-and-drop"
  ]
 },
 "web/scrim": {
  "lead": "Chính lớp nền tối đó là scrim, bấm vào nó là đóng được hộp thoại.",
  "sym": [
   "::backdrop",
   "<dialog>"
  ],
  "aka": [
   "backdrop",
   "overlay",
   "modal overlay"
  ],
  "def": "Scrim (lớp phủ mờ) là một lớp bán trong suốt trải kín vùng hiển thị, nằm giữa bề mặt modal đang mở và phần nội dung phía sau nó. Lớp này làm giảm độ tương phản của nền, ngăn người dùng lỡ tay thao tác vào phần phía sau, và khiến lớp đang hoạt động nổi bật rõ ràng. Với hộp thoại HTML gốc, lớp này được lộ ra dưới dạng pseudo-element ::backdrop.",
  "phrases": [
   "lớp tối trong suốt nằm sau cái popup",
   "trang bị tối đi khi modal hiện lên",
   "lớp phủ màu xám phía sau hộp thoại",
   "lớp chặn không cho bấm vào phần sau bảng nổi",
   "nền bị mờ nhạt đi bên dưới popup",
   "phần nền bị xám đi sau popup"
  ],
  "anatomy": [
   {
    "n": "Dim layer",
    "sym": "::backdrop",
    "d": "Khi ai đó nói “lớp tối trong suốt sau popup” thì họ đang chỉ vào dim layer (lớp làm tối) của scrim."
   },
   {
    "n": "Backdrop blur",
    "sym": "backdrop-filter",
    "d": "Câu “trang phía sau bị nhòe đi dưới lớp phủ tối” nói về backdrop blur (hiệu ứng làm mờ nền)."
   },
   {
    "n": "Light-dismiss area",
    "sym": "HTMLDialogElement.close()",
    "d": "Câu “vùng bên ngoài mà tôi bấm vào để đóng modal” chính là light-dismiss area (vùng bấm ra ngoài để đóng)."
   }
  ],
  "prompt": "Hãy thêm một scrim phía sau modal bằng pseudo-element <dialog>::backdrop. Scrim phải phủ kín viewport, làm tối trang và có thể làm mờ thêm nếu muốn, chặn mọi thao tác con trỏ xuyên qua, và hiện/ẩn mượt theo modal theo cả hai chiều (mở rồi đóng đều có fade).",
  "debug": "Hãy gỡ lỗi scrim/backdrop của tôi (::backdrop, lớp overlay fixed). Hãy loại trừ lần lượt các nguyên nhân sau: cuộn bị lan xuyên qua xuống trang bên dưới, cách xử lý là đặt overscroll-behavior contain và khoá cuộn của body; scrim nằm dưới nội dung vì một phần tử tổ tiên có transform đã tạo ra stacking context riêng; pointer-events vẫn còn bật trong lúc scrim đang mờ dần nên nó nuốt click mà không ai thấy; ::backdrop của dialog không style được vì dialog được mở bằng show() thay vì showModal(). Triệu chứng là:",
  "code": [
   {
    "lang": "CSS",
    "text": "::backdrop"
   },
   {
    "lang": "HTML",
    "text": "<dialog>"
   },
   {
    "lang": "CSS",
    "text": "backdrop-filter"
   }
  ],
  "see": [
   "web/dialog-drawer-sheet",
   "web/popover-dropdown-tooltip",
   "macos/vibrancy",
   "web/lightbox",
   "web/hamburger-menu",
   "web/product-tour"
  ]
 },
 "web/scroll-effects": {
  "lead": "chồng thẻ xếp lên nhau và thanh header tự ẩn đi.",
  "sym": [
   "animation-timeline: view()",
   "position: sticky"
  ],
  "aka": [
   "scroll animation",
   "animate on scroll",
   "scroll-triggered animation",
   "auto-hiding header",
   "sticky stacking cards",
   "quick return (Android term)"
  ],
  "def": "Khi người ta nói “những hiệu ứng hiện ra lúc cuộn trang” thì thường đó là một trong ba hiệu ứng: scroll reveal, stacking cards hoặc hide-on-scroll header. Scroll reveal cho từng khối mờ dần hiện lên khi nó trồi vào vị trí, dùng CSS animation-timeline: view() hoặc IntersectionObserver; theme Dawn của Shopify gọi kiểu này là “Reveal sections on scroll”. Stacking cards là các thẻ bám lên đỉnh rồi chồng dần lên nhau bằng position: sticky, thẻ sau đè lên thẻ trước; còn hide-on-scroll header thì trượt đi mất khi cuộn xuống và quay lại ngay ở lần cuộn lên đầu tiên (một biến thể họ hàng thì thu lại thành thanh mảnh thay vì biến mất). Parallax làm các lớp chuyển động với tốc độ khác nhau, và một header sticky thông thường thì không bao giờ ẩn.",
  "phrases": [
   "những hiệu ứng hiện ra khi mình cuộn trang",
   "có thứ gì đó trượt vào khi tôi cuộn xuống trang",
   "mấy cái thẻ xếp chồng lên cái trước khi cuộn",
   "thanh header trượt đi mất khi cuộn xuống",
   "cuộn lên cuộn xuống thì nội dung hiện dần rồi mờ dần",
   "vuốt xuống thì thanh công cụ ẩn đi"
  ],
  "anatomy": [
   {
    "n": "Entering block",
    "sym": "animation-range: entry",
    "d": "“Phần nội dung trồi lên từ phía dưới” là entering block của scroll reveal: được bắt khoảnh khắc đang diễn ra giữa chừng, vẫn còn hơi trong suốt và nằm thấp hơn vị trí cuối cùng vài pixel."
   },
   {
    "n": "Covering card",
    "sym": "position: sticky; top",
    "d": "“Các thẻ xếp chồng lên thẻ trước khi cuộn” là covering card của stacking cards: thẻ kế tiếp đang trượt lên đè lên thẻ đã dừng, và mép trên của thẻ bị đè vẫn lộ ra như một bậc thang phía trên."
   },
   {
    "n": "Retracting header",
    "sym": "transform: translateY(-100%)",
    "d": "“Cái header trượt đi khi cuộn xuống” là retracting header của hide-on-scroll header: thanh trên cùng đã ra khỏi tầm nhìn một nửa, sẵn sàng trượt về ngay khi bạn cuộn ngược lên."
   }
  ],
  "prompt": "Hãy dựng hiệu ứng cuộn phù hợp trong ba loại sau. Scroll reveal (dùng CSS animation-timeline: view() hoặc IntersectionObserver): cho khối mờ dần hiện ra trong khi nhích lên khoảng 24px. Stacking cards: mỗi thẻ dùng position: sticky với giá trị top lớn hơn thẻ trước một chút để thẻ sau đè lên được thẻ trước. Hide-on-scroll header: trượt ra ngoài (translateY(-100%)) khi cuộn xuống và trượt về khi có bất kỳ lần cuộn lên nào. Tuyệt đối không để nội dung bị vô hình nếu script bị lỗi.",
  "debug": "Hãy gỡ lỗi hiệu ứng cuộn của tôi (reveal bằng IntersectionObserver hoặc animation-timeline: view(), thẻ sticky xếp chồng, hide-on-scroll header). Hãy loại trừ lần lượt: các khối bị kẹt vô hình vì chúng bắt đầu ở opacity: 0 mà observer không bao giờ kích hoạt; reveal chạy lại mỗi lần phần tử đi vào lại vì thiếu tuỳ chọn once; animation-timeline được khai báo trước shorthand animation nên bị shorthand reset mất; thẻ sticky không bao giờ bám vì một phần tử tổ tiên có đặt overflow, hoặc không thấy bậc thang nào vì tất cả dùng chung một giá trị top; thẻ bị đè co lại từ tâm của nó thay vì từ transform-origin: top; header chớp nháy khi cuộn rung nhẹ vì handler không có ngưỡng dung sai, hoặc header ẩn đi trong lúc menu của nó đang mở; chuyển động vẫn chạy dù người dùng bật prefers-reduced-motion. Triệu chứng là:",
  "code": [
   {
    "lang": "CSS",
    "text": "animation-timeline: view()",
    "note": "dùng cho scroll reveal; chạy trên Chrome, Edge, Safari 26 và Firefox từ bản 159"
   },
   {
    "lang": "CSS",
    "text": "position: sticky",
    "note": "dùng cho stacking cards, giá trị top của mỗi thẻ thấp hơn thẻ trước vài pixel"
   },
   {
    "lang": "JavaScript",
    "text": "IntersectionObserver",
    "note": "cách kích hoạt reveal chạy được trên mọi trình duyệt"
   },
   {
    "lang": "Motion",
    "text": "whileInView",
    "note": "thêm viewport={{ once: true }} để chỉ chạy một lần; import từ \"motion/react\""
   },
   {
    "lang": "CSS",
    "text": "@container scroll-state(scrolled: block-start)",
    "note": "cho header hiện lại sau khi cuộn lên; chỉ có từ Chrome 144 trở lên"
   },
   {
    "lang": "Headroom.js",
    "text": "new Headroom(header).init()",
    "note": "gắn class headroom--unpinned trong lúc cuộn xuống"
   }
  ],
  "see": [
   "web/parallax",
   "web/sticky-fixed",
   "web/scrollspy",
   "web/header-navbar"
  ]
 },
 "web/scrollspy": {
  "lead": "Hãy nhìn thanh màu xanh trong danh sách “On this page” tự dịch chuyển khi bài viết cuộn. Bấm vào một liên kết để nhảy tới mục tương ứng.",
  "sym": [
   "IntersectionObserver",
   "aria-current=\"location\""
  ],
  "aka": [
   "scroll-linked navigation",
   "current-section navigation",
   "active table of contents",
   "On this page navigation",
   "in-page navigation",
   "table of contents highlighting"
  ],
  "def": "“Danh sách mục lục bên cạnh luôn đi theo chỗ tôi đang đọc trong bài” chính là scrollspy, còn gọi là scroll-linked navigation hoặc in-page navigation. Phần thanh bên đó chỉ là một <nav> thường chứa các liên kết fragment (href=\"#section-id\" trỏ tới id của các heading thật); một IntersectionObserver theo dõi những mục tiêu section ấy rồi chuyển aria-current=\"location\" cùng điểm nhấn màu sang đúng một liên kết của section đang hiện trên màn hình. Nhìn nó giống tabs nhưng không phải: tabs đổi một panel dùng chung khi bạn kích hoạt tab, còn scrollspy giữ nguyên cả tài liệu và chỉ phản ánh vị trí mà bạn vốn đã ở đó. Sticky positioning là thứ giữ thanh mục lục nằm cạnh bài viết; còn scrollspy là thứ thay đổi mục hiện hành của nó.",
  "phrases": [
   "một phần kiểu tab được cập nhật theo việc cuộn",
   "các vạch điều hướng",
   "menu điều hướng gồm các vạch dài ngắn khác nhau thay cho tab, mỗi phần đổi màu một vạch khác khi vuốt",
   "bộ dò tiến độ cho điều hướng bằng chữ",
   "chữ điều hướng theo cuộn ở góc trên bên phải",
   "các liên kết mục lục sáng lên khi mình cuộn",
   "menu bài viết bên phải đi theo từng phần"
  ],
  "anatomy": [
   {
    "n": "On-this-page rail",
    "sym": "<nav>",
    "d": "“Cái mục lục nhỏ bên cạnh đi theo chỗ tôi đang đọc” là On-this-page rail (thanh mục lục trên trang): một <nav> có nhãn gồm các liên kết fragment trỏ trong cùng tài liệu, thường được giữ trong tầm nhìn bằng position: sticky."
   },
   {
    "n": "Current-section indicator",
    "sym": "aria-current=\"location\"",
    "d": "“Vạch màu hoặc liên kết in đậm nhảy xuống dọc mục lục khi tôi cuộn” là current-section indicator (dấu chỉ mục hiện hành): tại mỗi thời điểm chỉ một liên kết mang aria-current=\"location\" cùng màu nhấn."
   },
   {
    "n": "Section anchor target",
    "sym": "IntersectionObserver.observe()",
    "d": "“Những tiêu đề mà danh sách bên cạnh đang dõi theo để biết nên làm sáng mục nào” là section anchor target (đích neo của section): các heading thật có giá trị id khớp với phần fragment trong href của thanh mục lục."
   }
  ],
  "prompt": "Hãy làm Scrollspy (scroll-linked navigation) cho bài viết này. Cần một thanh “On this page” là <nav> có nhãn, chứa các liên kết fragment trỏ trong cùng tài liệu, đặt cạnh nội dung và giữ bằng position: sticky. Cho một IntersectionObserver theo dõi từng section anchor target sao cho đúng một liên kết mang aria-current=\"location\". Làm current-section indicator thật rõ: một vạch nhấn dọc có độ tương phản cao cộng với nhãn đậm hơn, cả hai dịch theo tới section đang hiện. Dùng rootMargin để dời vùng kích hoạt đi một khoảng bằng chiều cao của header sticky.",
  "debug": "Hãy gỡ lỗi scrollspy / điều hướng On-this-page của tôi (IntersectionObserver, aria-current=\"location\", liên kết fragment). Hãy loại trừ lần lượt: phần nhấn đổi quá sớm hoặc quá muộn vì rootMargin không tính đến chiều cao header sticky; hai hay nhiều liên kết cùng được đánh dấu hiện hành vì callback của observer set state theo từng entry thay vì chọn một người thắng duy nhất trong các section đang giao nhau; section cuối không bao giờ thành hiện hành vì trang không cuộn đủ xa để đưa nó vào vùng kích hoạt (cần đệm thêm phần cuối bài hoặc thêm quy tắc dự phòng khi chạm đáy trang); không có gì sáng lên cả vì root của observer là viewport trong khi các section cuộn bên trong một container có overflow, hoặc vì observe() chạy trước khi các section tồn tại; các liên kết của thanh bên bị gán role=\"tab\" và aria-selected thay vì aria-current, khiến trình đọc màn hình thông báo một widget tab vốn không có; bấm liên kết thì nhảy đúng nhưng phần nhấn bị giật ngược lại vì observer kích hoạt bởi cuộn ghi đè section vừa được bấm. Triệu chứng là:",
  "code": [
   {
    "lang": "Web API",
    "text": "IntersectionObserver",
    "note": "theo dõi section mục tiêu nào đang nằm trong tầm nhìn"
   },
   {
    "lang": "ARIA",
    "text": "aria-current=\"location\"",
    "note": "đánh dấu MỘT liên kết duy nhất của section đang được đọc"
   },
   {
    "lang": "Bootstrap",
    "text": "bootstrap.ScrollSpy",
    "note": "bản dựng sẵn mà cái tên scrollspy xuất phát từ đó"
   },
   {
    "lang": "Bootstrap",
    "text": "data-bs-spy=\"scroll\"",
    "note": "cách khởi tạo khai báo ngay trong HTML, đi cùng data-bs-target"
   },
   {
    "lang": "HTML",
    "text": "<nav>",
    "note": "landmark có nhãn chứa các liên kết On this page"
   },
   {
    "lang": "Web API",
    "text": "IntersectionObserver.rootMargin",
    "note": "dời vùng kích hoạt xuống dưới header sticky"
   }
  ],
  "see": [
   "web/tabs",
   "web/sticky-fixed",
   "web/breadcrumbs",
   "web/scroll-effects"
  ]
 },
 "web/sign-in-form": {
  "lead": "Bấm vào con mắt, đó là nút bật/tắt hiển thị mật khẩu. Đường kẻ mảnh có chữ “or” là đường phân tách các cách đăng nhập.",
  "sym": [
   "autocomplete=\"current-password\"",
   "autocomplete=\"username\""
  ],
  "aka": [
   "login form",
   "login page",
   "login screen",
   "sign-in page",
   "auth form",
   "authentication form"
  ],
  "def": "“Biểu tượng con mắt ở ô mật khẩu”, “các nút đăng nhập bằng Google”, “đường kẻ có chữ or” — một sign-in form (người ta hay gọi là login form) là tập hợp các bộ phận đều có tên gọi đàng hoàng: password visibility toggle, federated sign-in buttons (nút của nhà cung cấp danh tính), và sign-in method divider. Phần quan trọng nhất của nó lại vô hình: autocomplete=\"username\" và autocomplete=\"current-password\" mới là thứ cho phép trình quản lý mật khẩu và passkey điền được vào form.",
  "phrases": [
   "màn hình đăng nhập",
   "ô nhập email, ô nhập mật khẩu và một nút đăng nhập",
   "biểu tượng con mắt ở ô mật khẩu",
   "các nút đăng nhập bằng Google",
   "đường kẻ có chữ hoặc nằm giữa các nút đăng nhập",
   "màn hình để gõ email và mật khẩu"
  ],
  "anatomy": [
   {
    "n": "Federated sign-in buttons",
    "sym": "\"Continue with Google\"",
    "d": "“Mấy nút đăng nhập bằng Google / Apple” là federated sign-in buttons (nút đăng nhập qua bên thứ ba; gọi là “social login” khi các bên đó là mạng xã hội) — nhãn chuẩn thường dùng là “Sign in with…” hoặc “Continue with…”."
   },
   {
    "n": "Sign-in method divider",
    "sym": "\"or\"",
    "d": "“Đường kẻ có chữ OR ở giữa” là sign-in method divider — một đường ngang bị ngắt bởi chữ “or”, ngăn cách các nút bên thứ ba với phần nhập email và mật khẩu."
   },
   {
    "n": "Password visibility toggle",
    "sym": "<button type=\"button\">",
    "d": "“Biểu tượng con mắt trong ô mật khẩu” là password visibility toggle (nút hiện mật khẩu) — nó có type=\"button\" nên bấm vào sẽ không bao giờ gửi form đi."
   }
  ],
  "prompt": "Hãy dựng một sign-in form (login form) dùng đúng ngữ nghĩa form gốc của HTML: một <form> thật chứa trường email có nhãn (<input type=\"email\" autocomplete=\"username\">), trường mật khẩu có nhãn (<input type=\"password\" autocomplete=\"current-password\">), và một <button type=\"submit\"> ghi nhãn \"Sign in\" để nhấn Enter là gửi được. Thêm password visibility toggle là một <button type=\"button\"> có tên truy cập được là \"Show password\"; đặt các federated sign-in buttons, gồm hai nút \"Continue with Google\" và \"Continue with Apple\", phía trên một sign-in method divider — đường kẻ mảnh có chữ \"or\" ở giữa. Các giá trị autocomplete là yếu tố sống còn: chính chúng khiến trình quản lý mật khẩu nhận ra và điền được các trường.",
  "debug": "Hãy gỡ lỗi sign-in form của tôi (token autocomplete, trình quản lý mật khẩu, gửi form bằng Enter). Hãy loại trừ lần lượt: trình quản lý mật khẩu không điền vì trường email thiếu autocomplete=\"username\", hoặc trường mật khẩu lại ghi new-password trên một form ĐĂNG NHẬP; nhấn Enter không làm gì vì các input không nằm trong một <form> thật có <button type=\"submit\">; nút con mắt làm form bị gửi đi vì thiếu type=\"button\"; bàn phím di động tự viết hoa định danh vì nó là type=\"text\" mà không có autocapitalize=\"none\"; state của framework vẫn rỗng dù trình duyệt đã tự điền vào DOM (hãy đọc giá trị vào lúc submit). Triệu chứng là:",
  "code": [
   {
    "lang": "HTML",
    "text": "autocomplete=\"current-password\"",
    "note": "đặt trên input mật khẩu, là thứ khiến trình quản lý mật khẩu đề nghị tự điền"
   },
   {
    "lang": "HTML",
    "text": "autocomplete=\"username\"",
    "note": "đặt trên trường email/tên đăng nhập, kể cả khi nó là type=\"email\""
   },
   {
    "lang": "HTML",
    "text": "<input type=\"password\">"
   },
   {
    "lang": "HTML",
    "text": "autocomplete=\"username webauthn\"",
    "note": "bổ sung tính năng tự điền passkey; webauthn phải đứng cuối danh sách"
   },
   {
    "lang": "Web API",
    "text": "navigator.credentials.get({ publicKey, mediation: \"conditional\" })",
    "note": "đăng nhập bằng passkey (conditional mediation)"
   }
  ],
  "see": [
   "web/form-field",
   "web/focus-ring-web",
   "web/divider"
  ]
 },
 "web/skeleton-spinner": {
  "lead": "Phát lại",
  "sym": [
   "aria-busy=\"true\"",
   "Skeleton"
  ],
  "aka": [
   "skeleton screen",
   "placeholder loader",
   "loading spinner",
   "throbber"
  ],
  "def": "Skeleton cho xem trước hình khối của nội dung chưa về tới nơi, nhờ vậy giảm layout shift và làm một trang có bố cục dự đoán được cảm giác nhanh hơn. Spinner thì báo hiệu một lần chờ không xác định, dùng khi chưa biết hình dạng cuối cùng của nội dung hoặc khi thao tác không gắn với một bố cục cụ thể. Cả hai đều không được tồn tại tiếp khi kết quả hoặc trạng thái lỗi đã có.",
  "phrases": [
   "mấy hình khối xám trong lúc nội dung đang tải",
   "bản nháp nhấp nháy của một cái card",
   "vòng tròn xoay trong lúc chờ",
   "những dòng chữ giả hiện ra trước khi dữ liệu về",
   "hiệu ứng đang tải nằm trong vùng trống"
  ],
  "anatomy": [
   {
    "n": "Skeleton block",
    "sym": "Skeleton",
    "d": "“Hình xám thế chỗ cho một card hoặc một bức ảnh” là skeleton block (khối khung xương)."
   },
   {
    "n": "Skeleton text line",
    "sym": "Skeleton",
    "d": "“Dòng xám giả ở chỗ chữ sẽ xuất hiện” là skeleton text line (dòng chữ khung xương)."
   },
   {
    "n": "Shimmer sweep",
    "sym": "@keyframes",
    "d": "“Vệt sáng nhỏ chạy ngang qua phần giữ chỗ” là shimmer sweep (vệt sáng quét)."
   },
   {
    "n": "Spinner track and arc",
    "sym": "role=\"status\"",
    "d": "“Vòng tròn mờ và đoạn đậm hơn xoay quanh nó” là spinner track (rãnh) và active arc (cung đang chạy) của spinner."
   }
  ],
  "prompt": "Hãy đánh dấu vùng đang tải bằng aria-busy=\"true\", và dùng skeleton khi đã biết bố cục cuối cùng của card, giữ nguyên hình khối của nó trong lúc dữ liệu đang về. Dùng spinner với role=\"status\" khi lần chờ không gắn với hình dạng nội dung nào có ý nghĩa, và thay thế chỉ báo (dù là loại nào) ngay khi tải xong.",
  "debug": "Hãy gỡ lỗi skeleton/spinner (các placeholder khi tải) của tôi. Hãy loại trừ lần lượt: skeleton nhấp nháy lên rồi biến mất với những lần tải dưới 200ms — hãy thêm độ trễ trước khi hiện; hiệu ứng shimmer lặp mãi vì trạng thái lỗi không bao giờ thay thế nó; hình dạng skeleton không khớp nội dung thật nên lúc hoán đổi gây layout shift; hàng chục placeholder cùng chạy animation một lúc làm cuộn bị giật. Triệu chứng là:",
  "code": [
   {
    "lang": "ARIA",
    "text": "aria-busy=\"true\""
   },
   {
    "lang": "shadcn/ui",
    "text": "Skeleton"
   },
   {
    "lang": "ARIA",
    "text": "role=\"status\""
   }
  ],
  "see": [
   "web/empty-state",
   "web/toast",
   "web/focus-ring-web",
   "web/text-scramble",
   "web/card",
   "web/text-animations"
  ]
 },
 "web/spring": {
  "lead": "Lò xo vọt qua đường nét đứt ở CẢ HAI đầu hành trình rồi dội về chỗ cũ; quãng đi thừa đó là overshoot, còn ease-out thì không bao giờ vượt qua vạch nào.",
  "sym": [
   "transition={{ type: \"spring\", stiffness, damping }}",
   "linear(…)"
  ],
  "aka": [
   "spring physics",
   "bouncy animation",
   "spring transition"
  ],
  "def": "“Nó nảy nhẹ qua khỏi chỗ đáp rồi mới dừng” chính là spring animation (hiệu ứng lò xo) — chuyển động chạy bằng vật lý (stiffness, damping, mass) chứ không phải bằng thời lượng và đường cong. Dấu hiệu nhận biết là overshoot: phần tử trôi qua khỏi đích rồi dội ngược trở lại. Lò xo cũng đổi đích giữa chừng rất mượt, và đó là lý do các giao diện điều khiển bằng cử chỉ hay dùng chúng.",
  "phrases": [
   "hiệu ứng nảy, đi quá rồi quay lại",
   "nó vọt quá một chút rồi mới ổn định",
   "cú nảy như thạch khi một panel mở ra",
   "chuyển động nảy kiểu iOS",
   "animation dùng độ cứng và độ giảm chấn thay vì thời lượng"
  ],
  "anatomy": [
   {
    "n": "Overshoot",
    "sym": "damping",
    "d": "“Chỗ nó đi quá vạch rồi quay lại” là overshoot — damping quyết định bao nhiêu phần của cú vọt đó còn sót lại."
   }
  ],
  "prompt": "Hãy cho animation này vật lý lò xo: dùng Motion với transition là {{ type: \"spring\", stiffness: 300, damping: 22 }} (hoặc react-spring) thay cho cặp thời lượng cộng easing — phần tử phải vọt nhẹ qua đích rồi ổn định lại; tăng damping để triệt tiêu độ rung lắc, tăng stiffness để chuyển động dứt khoát hơn. Với CSS thuần, hãy nướng sẵn đường cong lò xo vào một hàm timing linear().",
  "debug": "Hãy gỡ lỗi spring animation của tôi (Motion với type: \"spring\", hoặc react-spring, hoặc hàm linear() trong CSS). Hãy loại trừ lần lượt: damping quá thấp nên rung lắc như thạch; stiffness quá thấp nên chuyển động nặng nề như dưới nước; một giá trị duration chống lại vật lý (lò xo tự tính thời gian ổn định của nó); cú overshoot bị cắt bởi phần tử cha có overflow-hidden; khi bị ngắt giữa chừng thì chuyển động giật cục vì lò xo khởi động lại từ đích thay vì đổi đích từ vận tốc hiện tại. Triệu chứng là:",
  "code": [
   {
    "lang": "Motion",
    "text": "transition={{ type: \"spring\", stiffness, damping }}",
    "note": "không có duration, vật lý tự quyết định khi nào dừng"
   },
   {
    "lang": "CSS",
    "text": "linear(…)",
    "note": "lò xo được nướng thành các điểm khoá, tức là lò xo bằng CSS thuần"
   },
   {
    "lang": "React",
    "text": "react-spring"
   },
   {
    "lang": "SwiftUI",
    "text": ".spring(response:dampingFraction:)",
    "note": "cùng ý tưởng nhưng trên nền tảng Apple"
   }
  ],
  "see": [
   "web/easing",
   "web/toast",
   "web/parallax"
  ]
 },
 "web/status-dot": {
  "lead": "Hãy chọn một trạng thái bên dưới. Vòng tròn nhỏ ở góc ảnh chính là status dot.",
  "sym": [
   "<PresenceBadge status=\"available\" />",
   "<Badge variant=\"dot\">"
  ],
  "aka": [
   "presence indicator",
   "presence badge",
   "online indicator",
   "live indicator",
   "availability dot",
   "dot badge",
   "pulse dot",
   "ping dot"
  ],
  "def": "“Chấm xanh nhỏ xíu” là status dot, và được gọi là presence indicator khi nó cho biết một người có đang online hay không (Fluent UI gọi là PresenceBadge; tài liệu của Ant Design thì chính họ dùng từ status dot). Nó là một hình tròn nhỏ tô đặc, không có số hay chữ bên trong, thường chồng lên mép dưới bên phải của avatar hoặc nằm cạnh nhãn của một dòng, và màu của nó chỉ mang đúng một trạng thái: available, away, busy, offline, hoặc một cảnh báo. Một chấm trực tiếp (live) thường có thêm ping halo, tức là vòng sáng nở ra rồi mờ đi phía sau nó. Nó không phải count badge (loại chứa một con số), không phải hàng chấm bên dưới carousel (bộ chọn slide), và cũng không phải unread dot, loại trông giống hệt nhưng ý nghĩa là có nội dung mới và sẽ biến mất sau khi bạn đã xem.",
  "phrases": [
   "cái chấm xanh nhỏ",
   "chấm nhỏ báo hiệu một cảnh báo",
   "chỉ báo trực tiếp",
   "chấm trực tiếp",
   "chấm nhỏ trên các thẻ, vòng tròn bé nhấp nháy",
   "chấm nhịp đập dùng cho phần hướng dẫn làm quen"
  ],
  "anatomy": [
   {
    "n": "Status dot",
    "sym": "PresenceBadge",
    "d": "“Chấm xanh nhỏ xíu” chính là bản thân status dot: một hình tròn nhỏ tô đặc, không có số bên trong, chồng lên mép dưới bên phải của avatar."
   },
   {
    "n": "Status state",
    "sym": "status=\"away\"",
    "d": "“Chấm đổi từ xanh sang cam hoặc xám” đang thể hiện status state của nó: một giá trị có tên (available, away, busy, offline) quyết định màu sắc."
   },
   {
    "n": "Ping halo",
    "sym": "animate-ping",
    "d": "“Vòng đập quanh chấm trực tiếp” là ping halo (còn gọi là pulse ring hoặc ripple): nó nở ra rồi mờ đi trong khi chấm đặc ở giữa đứng yên."
   },
   {
    "n": "Separation ring",
    "sym": "border",
    "d": "“Viền trắng nhỏ khoét quanh chấm trên avatar” là separation ring (vòng tách nền): một đường viền mang màu của bề mặt, giúp chấm vẫn đọc rõ khi nằm trên ảnh."
   }
  ],
  "prompt": "Hãy dùng một status dot (presence indicator) giống PresenceBadge của Fluent UI hoặc Badge variant=\"dot\" với overlap=\"circular\" của Material UI: một hình tròn nhỏ tô đặc chồng lên mép dưới bên phải của avatar, kèm viền 2px màu bề mặt làm separation ring. Lấy màu từ một giá trị status tường minh duy nhất (available xanh lá, away hổ phách, busy đỏ, offline xám), và đưa cùng ý nghĩa đó vào chữ hiển thị hoặc tên truy cập được của dòng, không bao giờ chỉ dựa vào màu. Với trạng thái live, hãy đặt một ping halo animate-ping an toàn về chuyển động (motion-safe) căn giữa phía sau chấm và giữ lõi đặc đứng yên.",
  "debug": "Hãy gỡ lỗi status dot / presence indicator của tôi (thuộc tính status của PresenceBadge, thẻ Badge có variant=\"dot\" cùng overlap=\"circular\", ping halo animate-ping, separation ring border). Hãy loại trừ lần lượt: chấm bị định vị theo khung vuông của avatar thay vì theo hình tròn nên lơ lửng ra khỏi mép bo (Material UI cần overlap=\"circular\"); separation ring vẽ bằng outline hoặc tiện ích ring với màu trắng gán cứng nên ở dark mode nó thành quầng nhạt thay vì khớp với màu bề mặt; animate-ping áp lên chính cái chấm nên cả chấm mờ đi, thay vì áp lên một halo anh em đặt sau lõi đặc; halo không căn giữa chấm, hoặc bị cắt bởi wrapper của avatar có overflow-hidden; animation bỏ qua prefers-reduced-motion; trạng thái chỉ truyền đạt bằng màu, không có chữ hay tên truy cập được, nên xanh hay đỏ đều vô hình với trình đọc màn hình và người mù màu; role=\"status\" đặt lên một chấm tồn tại lâu dài nên công nghệ hỗ trợ đọc lại mỗi lần re-render; unread dot và presence dot dùng chung một component và một màu, nên không ai phân biệt được nội dung mới với đang online; chấm co giãn theo avatar cho tới khi quá nhỏ không thấy nổi ở cỡ 24px. Triệu chứng là:",
  "code": [
   {
    "lang": "Fluent UI",
    "text": "<PresenceBadge status=\"available\" />",
    "note": "component cụ thể nhất; status còn nhận các giá trị busy, away, do-not-disturb, out-of-office, offline, blocked, unknown"
   },
   {
    "lang": "Material UI",
    "text": "<Badge variant=\"dot\">",
    "note": "một chấm không kèm số gắn lên phần tử con bất kỳ; thêm overlap=\"circular\" khi phần tử con là avatar tròn"
   },
   {
    "lang": "Ant Design",
    "text": "<Badge status=\"success\" />",
    "note": "Ant gọi đây là status dot; status gồm success, processing, default, error hoặc warning, có thể kèm chữ bên cạnh"
   },
   {
    "lang": "Ant Design",
    "text": "<Badge dot>",
    "note": "một chế độ khác: chấm đỏ trơn thay cho con số, tức trường hợp unread"
   },
   {
    "lang": "Tailwind CSS",
    "text": "animate-ping",
    "note": "vòng halo nở ra rồi mờ đi đặt sau chấm live; animate-pulse là hiệu ứng khác, làm mờ chính phần tử"
   },
   {
    "lang": "CSS",
    "text": "border",
    "note": "vòng mang màu bề mặt tách chấm khỏi avatar mà nó chồng lên"
   }
  ],
  "see": [
   "web/badge-chip-pill",
   "web/avatar-group",
   "web/chat-bubble",
   "web/progress-indicators",
   "web/product-tour"
  ]
 },
 "web/steps": {
  "lead": "Hãy bấm Shipping hoặc Payment. Vòng tròn xanh đặc là bước hiện tại, được đánh dấu aria-current=\"step\".",
  "sym": [
   "aria-current=\"step\"",
   "<ol>"
  ],
  "aka": [
   "stepper",
   "wizard progress indicator",
   "step indicator",
   "step-by-step indicator",
   "multi-step progress",
   "step bar"
  ],
  "def": "“Những vòng tròn đánh số 1 2 3 khi thanh toán” là Steps (Material UI gọi component này là Stepper, còn Ant Design và Chakra UI gọi là Steps). Mỗi giai đoạn là một step indicator hình tròn kèm nhãn, nối với nhau bằng step connector; giai đoạn đã xong thì đổi số thành dấu tick, giai đoạn bạn đang ở được đánh dấu aria-current=\"step\", còn các giai đoạn phía trước giữ màu nhạt. Cẩn thận với từ stepper: trên macOS, Stepper (NSStepper) là cặp mũi tên lên/xuống rất nhỏ để đổi một con số, chẳng liên quan gì đến wizard. Nó cũng không phải pagination (các trang ngang hàng, có địa chỉ riêng, của cùng một tập hợp), không phải breadcrumbs (cho biết bạn đứng đâu trong một cây phân cấp), không phải tabs (các view ngang hàng dùng aria-selected), và không phải progress bar (một tỷ lệ phần trăm, không có giai đoạn nào được đặt tên).",
  "phrases": [
   "những vòng tròn đánh số hiện bước 1 2 3 lúc thanh toán",
   "một dãy huy hiệu cho biết đang ở bước nào",
   "chỉ báo các bước khi làm quen ban đầu",
   "tab dùng như các bước",
   "form nhập liệu chia theo từng bước",
   "quy trình nhiều bước",
   "chuỗi quy trình"
  ],
  "anatomy": [
   {
    "n": "Step indicator",
    "sym": "Steps.Indicator",
    "d": "“Vòng tròn có đánh số” là step indicator (Material UI gọi là StepIcon): mỗi giai đoạn một vòng tròn gọn, chứa số thứ tự của giai đoạn đó."
   },
   {
    "n": "Step connector",
    "sym": "<StepConnector />",
    "d": "“Đường nối các vòng tròn với nhau” là step connector (Chakra gọi là Steps.Separator; Ant Design đặt tên là itemRail): phần phía sau bạn được tô màu, phần phía trước để nhạt."
   },
   {
    "n": "Completed step",
    "sym": "Steps.Status",
    "d": "“Vòng tròn biến thành dấu tick” là completed step: giai đoạn đã xong đổi số thành dấu tick nhưng vẫn giữ nhãn."
   },
   {
    "n": "Current step",
    "sym": "aria-current=\"step\"",
    "d": "“Vòng tròn được làm nổi, chỗ tôi đang đứng bây giờ” là current step. Material UI gọi nó là active step, còn Ant Design gán cho nó status=\"process\"."
   },
   {
    "n": "Step label",
    "sym": "<StepLabel />",
    "d": "“Dòng chữ nằm dưới mỗi con số” là step label (ở Chakra là Steps.Title, còn ở Ant Design là title của item): tên ngắn của giai đoạn, ví dụ Shipping hay Payment."
   }
  ],
  "prompt": "Hãy dựng một Steps indicator cho luồng thanh toán này dưới dạng <ol> gồm các giai đoạn có nhãn, với mục hiện tại được đánh dấu aria-current=\"step\". Hiển thị mỗi giai đoạn thành một Steps.Indicator hình tròn có đánh số (tương đương StepIcon của Material UI), nối các giai đoạn liền kề bằng StepConnector (Steps.Separator), thay số của các bước đã xong bằng dấu tick, và để các bước tương lai ở màu nhạt. Điều khiển toàn bộ từ một chỉ số tính từ 0 duy nhất (activeStep của Material UI / current của Ant Design) và suy ra trạng thái đã xong, hiện tại, sắp tới từ đúng một giá trị đó; trạng thái khi mới vào là bước 2, Payment, để cả ba trạng thái đều hiện cùng lúc.",
  "debug": "Hãy gỡ lỗi Steps / stepper của tôi (aria-current=\"step\", chỉ số activeStep / current, màu tô của StepConnector). Hãy loại trừ lần lượt: có hơn một giai đoạn mang aria-current=\"step\", hoặc không giai đoạn nào có, khiến công nghệ hỗ trợ đọc sai vị trí; activeStep tính từ 0 bị trộn với con số tính từ 1 in trong vòng tròn (chỉ nên đổi ở đúng một chỗ); trạng thái đã xong suy ra từ một cờ riêng lệch pha với chỉ số hiện tại nên dấu tick nằm trước giai đoạn hiện tại; phần tô của connector bám theo một chỉ số khác với các indicator nên còn đường kẻ tô màu dẫn vào một bước sắp tới; cả component bị dựng thành role=\"progressbar\" hoặc một thanh trơn nên trình đọc màn hình đọc \"60%\" thay vì \"Payment, step 3 of 4\"; các giai đoạn được render bằng div, không có ngữ nghĩa danh sách có thứ tự và mỗi bước không có tên truy cập được; step label không gắn với thứ gì nên vòng tròn chỉ đọc ra một con số trơ trọi; chỉ số chỉ được giữ trong state của component nên refresh hoặc nút Back của trình duyệt đưa người dùng về bước 1; luồng có kiểm tra hợp lệ vẫn cho một cú bấm nhảy cóc tới giai đoạn chưa tới. Triệu chứng là:",
  "code": [
   {
    "lang": "ARIA",
    "text": "aria-current=\"step\"",
    "note": "đánh dấu MỘT giai đoạn duy nhất mà bạn đang ở"
   },
   {
    "lang": "HTML",
    "text": "<ol>",
    "note": "WAI dựng step-by-step indicator của họ bằng danh sách có thứ tự; các giai đoạn thật sự có trình tự"
   },
   {
    "lang": "Material UI",
    "text": "<Stepper activeStep={2}>",
    "note": "activeStep tính từ 0; orientation là horizontal hoặc vertical"
   },
   {
    "lang": "Ant Design",
    "text": "<Steps current={2} items={items} />",
    "note": "current tính từ 0; status của từng bước là wait, process, finish hoặc error"
   },
   {
    "lang": "Chakra UI",
    "text": "<Steps.Root step={2} count={4}>",
    "note": "gồm các phần con Steps.Item, Steps.List, Steps.Title, Steps.Indicator và Steps.Separator"
   },
   {
    "lang": "Material UI",
    "text": "<StepConnector />",
    "note": "đường nằm giữa các giai đoạn; <StepIcon /> là vòng tròn, <StepLabel /> là phần chú thích"
   }
  ],
  "see": [
   "web/pagination",
   "web/breadcrumbs",
   "web/tabs",
   "web/progress-indicators",
   "macos/stepper",
   "web/timeline",
   "web/product-tour"
  ]
 },
 "web/sticky-fixed": {
  "lead": "position: sticky",
  "sym": [
   "position: sticky",
   "position: fixed"
  ],
  "aka": [
   "sticky header",
   "fixed header",
   "pinned element"
  ],
  "def": "Phần tử sticky vẫn tham gia bố cục bình thường cho đến khi việc cuộn chạm tới khoảng inset của nó, rồi từ đó nó được ghim lại bên trong vùng cuộn chứa nó. Phần tử fixed thì bị gỡ khỏi luồng bố cục bình thường và neo vào viewport (hoặc vào một containing block có transform) ngay từ đầu. Sticky thường hợp cho header của bảng và của từng section; còn fixed điển hình dành cho các điều khiển cần luôn hiện trên viewport.",
  "phrases": [
   "cái header đứng yên trong khi panel cuộn",
   "thanh ghim ở đỉnh màn hình",
   "phần tử lúc đầu cuộn theo rồi bị dính lại",
   "giữ cái này luôn hiện khi cuộn",
   "nút nổi cố định ở góc",
   "khi tôi cuộn trang thì vẫn luôn giữ hiển thị"
  ],
  "anatomy": [
   {
    "n": "Sticky threshold",
    "sym": "top",
    "d": "“Điểm mà header ngừng cuộn và bị dính lại” là sticky threshold (ngưỡng dính)."
   },
   {
    "n": "Sticky scroll container",
    "sym": "position: sticky",
    "d": "“Cái panel mà header sticky bị nhốt bên trong” chính là scroll container (vùng cuộn chứa) của nó."
   }
  ],
  "prompt": "Hãy dùng position: sticky cùng top: 0 cho header của section để nó cuộn bình thường cho tới khi chạm đỉnh của vùng cuộn gần nhất chứa nó, rồi ở nguyên đó. Chỉ dành position: fixed cho phần giao diện phải neo vào viewport, độc lập với mọi vùng cuộn.",
  "debug": "Hãy gỡ lỗi việc định vị sticky/fixed của tôi. Hãy loại trừ lần lượt: sticky không làm gì vì một phần tử tổ tiên có overflow hidden/auto/scroll — đây là nguyên nhân kinh điển; sticky thiếu offset top/bottom nên không bao giờ kích hoạt; fixed hành xử như absolute bên trong một tổ tiên có transform/filter; nội dung bị nhảy khi một phần tử chuyển sang fixed vì không có placeholder giữ chỗ chiều cao của nó. Triệu chứng là:",
  "code": [
   {
    "lang": "CSS",
    "text": "position: sticky"
   },
   {
    "lang": "CSS",
    "text": "position: fixed"
   },
   {
    "lang": "CSS",
    "text": "top"
   }
  ],
  "see": [
   "macos/toolbar",
   "macos/sidebar",
   "web/popover-dropdown-tooltip",
   "web/header-navbar",
   "web/parallax",
   "web/scrollspy",
   "web/floating-buttons",
   "web/scroll-effects"
  ]
 },
 "web/switch-checkbox-radio": {
  "lead": "Chọn một trong nhiều",
  "sym": [
   "<input type=\"checkbox\" role=\"switch\">",
   "<input type=\"checkbox\">"
  ],
  "aka": [
   "toggle switch",
   "check box",
   "radio button",
   "option button"
  ],
  "def": "Switch điều khiển một cài đặt nhị phân và cho người dùng biết thay đổi có hiệu lực ngay lập tức, ví dụ bật thông báo. Checkbox đại diện cho một giá trị form độc lập và có thể chờ đến khi bấm Save hoặc Submit; nhiều checkbox có thể được chọn cùng lúc. Radio button tạo thành một nhóm có tên, trong đó chọn một lựa chọn sẽ bỏ chọn các lựa chọn còn lại.",
  "phrases": [
   "cái điều khiển gạt qua lại bật tắt",
   "ô vuông có dấu tick",
   "những vòng tròn mà chỉ chọn được một",
   "cài đặt đổi ngay khi bấm",
   "chọn nhiều so với chọn đúng một"
  ],
  "anatomy": [
   {
    "n": "Switch thumb",
    "sym": "role=\"switch\"",
    "d": "“Vòng tròn nhỏ trượt sang trái sang phải” là switch thumb (núm gạt)."
   },
   {
    "n": "Switch track",
    "sym": "role=\"switch\"",
    "d": "“Viên thuốc bo tròn nằm phía sau vòng tròn đang di chuyển” là switch track (rãnh)."
   },
   {
    "n": "Checkbox checkmark",
    "sym": "<input type=\"checkbox\">",
    "d": "“Dấu tick hiện ra bên trong ô vuông” là checkbox checkmark."
   },
   {
    "n": "Radio selection dot",
    "sym": "<input type=\"radio\">",
    "d": "“Chấm tô đặc nằm trong vòng tròn được chọn” là radio selection dot."
   }
  ],
  "prompt": "Hãy dùng <input type=\"checkbox\" role=\"switch\"> cho cài đặt bật/tắt nhị phân, một <input type=\"checkbox\"> gốc cho mỗi lựa chọn tick độc lập, và các điều khiển <input type=\"radio\"> cùng name khi chỉ cho phép đúng một lựa chọn. Mỗi điều khiển phải có nhãn nhìn thấy được và bấm vào được, và trạng thái đã chọn phải được phơi ra thông qua chính điều khiển gốc.",
  "debug": "Hãy gỡ lỗi switch/checkbox/radio của tôi. Hãy loại trừ lần lượt: điều khiển lật trên giao diện trong khi state vẫn cũ — input controlled mà thiếu onChange; bấm nhãn không bật tắt được vì thiếu liên kết for/id; các radio không hành xử như một nhóm vì thuộc tính name của chúng khác nhau; trạng thái indeterminate của checkbox mất đi — nó chỉ đặt được từ JS, không đặt được trong markup. Triệu chứng là:",
  "code": [
   {
    "lang": "HTML",
    "text": "<input type=\"checkbox\" role=\"switch\">"
   },
   {
    "lang": "HTML",
    "text": "<input type=\"checkbox\">"
   },
   {
    "lang": "HTML",
    "text": "<input type=\"radio\">"
   },
   {
    "lang": "shadcn/ui",
    "text": "Switch"
   },
   {
    "lang": "shadcn/ui",
    "text": "Checkbox"
   }
  ],
  "see": [
   "web/toggle-group",
   "web/badge-chip-pill",
   "web/focus-ring-web",
   "macos/segmented-control",
   "web/multi-select"
  ]
 },
 "web/tabs": {
  "lead": "+12% so với tuần trước",
  "sym": [
   "role=\"tablist\"",
   "role=\"tab\""
  ],
  "aka": [
   "tabbed interface",
   "tab list",
   "tab bar"
  ],
  "def": "Tabs gom các view ngang hàng vào một vùng dùng chung, tại mỗi thời điểm chỉ có đúng một tab và một panel đang hoạt động. Nhãn đang được chọn luôn hiện rõ về mặt thị giác, thường có gạch chân, và người dùng bàn phím di chuyển qua lại trong danh sách tab bằng phím mũi tên. Hãy dùng chúng cho những view có quan hệ gần gũi, chứ không dùng cho một quy trình tuần tự.",
  "phrases": [
   "hàng nhãn bấm vào để đổi panel phía dưới",
   "các mục có gạch chân dưới mục đang chọn",
   "các tiêu đề bấm được để chuyển view",
   "bộ chuyển ngang nằm phía trên nội dung",
   "điều hướng kiểu tab của trình duyệt nhưng nằm trong trang"
  ],
  "anatomy": [
   {
    "n": "Tab list",
    "sym": "role=\"tablist\"",
    "d": "“Cả hàng nhãn dùng để chuyển view” là tab list."
   },
   {
    "n": "Active-tab indicator",
    "sym": "aria-selected=\"true\"",
    "d": "“Đường kẻ chạy dưới nhãn đang được chọn” là active-tab indicator (dấu chỉ tab đang chọn)."
   },
   {
    "n": "Tab panel",
    "sym": "role=\"tabpanel\"",
    "d": "“Vùng nội dung dùng chung đổi bên dưới các nhãn” là tab panel."
   }
  ],
  "prompt": "Hãy dựng Tabs truy cập được: một role=\"tablist\", đúng một role=\"tab\" được đánh dấu aria-selected=\"true\", và một role=\"tabpanel\" tương ứng, nối với nhau bằng aria-controls và aria-labelledby. Chỉ tab đang hoạt động giữ tabindex=\"0\", di chuyển giữa các tab bằng phím mũi tên Trái và Phải, và đổi panel dùng chung mà không điều hướng sang trang khác.",
  "debug": "Hãy gỡ lỗi tabs của tôi (role=tablist/tab/tabpanel, roving tabindex). Hãy loại trừ lần lượt: mọi tab đều nằm trong thứ tự Tab thay vì một roving tabindex duy nhất với di chuyển bằng phím mũi tên; các panel thiếu tham chiếu ngược aria-labelledby; chỉ báo tab đang chọn không dịch theo khi đổi kích thước vì vị trí của nó chỉ được đo một lần; state của panel bị mất khi chuyển tab vì các panel không hoạt động bị unmount trong khi lẽ ra chỉ nên ẩn đi. Triệu chứng là:",
  "code": [
   {
    "lang": "ARIA",
    "text": "role=\"tablist\""
   },
   {
    "lang": "ARIA",
    "text": "role=\"tab\""
   },
   {
    "lang": "ARIA",
    "text": "role=\"tabpanel\""
   },
   {
    "lang": "Radix",
    "text": "Tabs"
   }
  ],
  "see": [
   "web/accordion",
   "web/toggle-group",
   "macos/segmented-control",
   "web/carousel",
   "web/pagination",
   "web/steps",
   "web/scrollspy",
   "web/bottom-navigation"
  ]
 },
 "web/text-animations": {
  "lead": "Ba kiểu chữ chuyển động: chữ được gõ ra từng ký tự, một từ cuộn lên thay thế, và một vệt sáng quét ngang qua chữ.",
  "sym": [
   "background-clip: text",
   "steps()"
  ],
  "aka": [
   "typing animation",
   "typing effect",
   "word rotator",
   "flip words",
   "shiny text",
   "thinking shimmer"
  ],
  "def": "“Chữ hiện ra từng ký tự một” là hiệu ứng typewriter, “từ cuộn lên đổi chỗ” là rotating words, còn “dòng Thinking… màu xám có ánh sáng quét ngang” là text shimmer. Typewriter gõ chữ ra phía sau một con trỏ caret nhấp nháy (TypingAnimation của Magic UI); rotating words thay một từ trong tiêu đề landing page, từ cũ cuộn lên trên khi từ mới cuộn vào (WordRotate, FlipWords của Aceternity UI); shimmer quét một dải sáng ngang qua chữ xám bằng background-clip: text, đúng kiểu các ứng dụng AI báo rằng mô hình đang “Thinking…”. Shimmer của skeleton thì quét qua các khối placeholder xám chứ không phải chữ; text scramble xáo trộn các ký tự ngẫu nhiên; còn marquee thì cuộn nguyên một dòng theo chiều ngang.",
  "phrases": [
   "chữ hiện ra từng ký tự một",
   "chữ cuộn theo hướng từ dưới lên, cái này nằm chồng lên cái kia",
   "hiệu ứng “thinking” của các LLM",
   "chữ lật như bảng ở sân bay",
   "một dải sáng quét đi quét lại qua chữ, trông như sóng nước chảy",
   "hiệu ứng ánh sáng quét qua chữ",
   "hiệu ứng chữ đang suy nghĩ của chatgpt"
  ],
  "anatomy": [
   {
    "n": "Typing caret",
    "sym": "cursorStyle (Magic UI TypingAnimation)",
    "d": "“Vạch nhỏ nhấp nháy sau các chữ” là typing caret, đứng yên khi đang gõ và nhấp nháy khi đang chờ."
   },
   {
    "n": "Incoming word",
    "sym": "<WordRotate> (Magic UI)",
    "d": "“Từ kế tiếp trồi lên từ bên dưới” là incoming word, trượt vào một khe bị cắt trong lúc từ cũ đi lên và biến mất."
   },
   {
    "n": "Shine band",
    "sym": "background-clip: text",
    "d": "“Sọc sáng chạy ngang qua chữ xám” là shine band, một gradient bị cắt vừa khít theo các chữ cái rồi trượt sang bên."
   }
  ],
  "prompt": "Hãy dựng hiệu ứng chữ đúng với loại cần thiết. Typewriter (TypingAnimation của Magic UI): gõ từng chữ phía sau một caret nhấp nháy. Rotating words (WordRotate của Magic UI): từ cũ cuộn lên và đi khỏi trong khi từ mới trượt vào từ bên dưới, trong một khe bị cắt có chiều rộng đổi mượt theo. Text shimmer (background-clip: text): quét một dải sáng ngang qua chữ xám. Giữ cho toàn bộ chữ vẫn đọc được với trình đọc màn hình, và dừng chuyển động khi người dùng bật prefers-reduced-motion.",
  "debug": "Hãy gỡ lỗi hiệu ứng chữ của tôi (typewriter, rotating words hoặc text shimmer, dùng background-clip: text, steps() hay WordRotate). Hãy loại trừ lần lượt: dòng chữ nhảy trong lúc gõ vì khung co theo phần chữ đã gõ thay vì theo cả cụm từ đầy đủ; khung của từ đang xoay đổi bề rộng đột ngột sang kích thước mới thay vì được animate; từ cũ và từ mới chồng lên nhau vì khe không có overflow clip; shimmer hiện ra một hình chữ nhật có màu vì background-clip: text thiếu tiền tố -webkit- hoặc màu chữ chưa là transparent; mỗi vòng lặp có một cú nhảy nhìn thấy được vì dải sáng bắt đầu ngay trên chữ chứ không bắt đầu từ ngoài chữ; trình đọc màn hình đọc từng chữ cái được gõ; chuyển động vẫn chạy khi bật prefers-reduced-motion. Triệu chứng là:",
  "code": [
   {
    "lang": "CSS",
    "text": "background-clip: text",
    "note": "dùng cho shimmer: một gradient chuyển động chỉ được tô bên trong các chữ cái"
   },
   {
    "lang": "CSS",
    "text": "steps()",
    "note": "kiểu nhấp nháy bật/tắt dứt khoát của caret trong typewriter"
   },
   {
    "lang": "shadcn/ui",
    "text": "shimmer",
    "note": "tiện ích CSS, dùng shimmer-duration-<ms>, mặc định là 2000 ms"
   },
   {
    "lang": "Magic UI",
    "text": "<TypingAnimation>",
    "note": "có các tuỳ chọn typeSpeed, deleteSpeed, cursorStyle"
   },
   {
    "lang": "Magic UI",
    "text": "<WordRotate>",
    "note": "ngoài ra còn có FlipWords của Aceternity UI và RotatingText của React Bits"
   },
   {
    "lang": "motion-primitives",
    "text": "<TextShimmer>",
    "note": "ngoài ra còn có Animated Shiny Text của Magic UI"
   }
  ],
  "see": [
   "web/text-scramble",
   "web/skeleton-spinner",
   "web/marquee",
   "macos/insertion-caret"
  ]
 },
 "web/text-scramble": {
  "lead": "Những ký hiệu ngẫu nhiên bị làm mờ là phần glyph đang xáo trộn; mỗi ký tự khoá lại ở hạn chót riêng của nó, từ trái sang phải (bấm để phát lại).",
  "sym": [
   "ScrambleTextPlugin",
   "requestAnimationFrame + charset swap"
  ],
  "aka": [
   "decode effect",
   "matrix text effect",
   "shuffle text"
  ],
  "def": "“Các chữ cái xáo trộn cho đến khi ghép thành từ” là text scramble, còn gọi là hiệu ứng decode hoặc Matrix — mọi ký tự đều quay qua những glyph ngẫu nhiên rồi mới khoá vào đúng chỗ, thường là từ trái sang phải. Công cụ kinh điển là ScrambleTextPlugin của GSAP (miễn phí từ bản 3.13); các bản tự viết tay là một vòng lặp requestAnimationFrame với hạn chót ổn định riêng cho từng ký tự.",
  "phrases": [
   "chữ xáo trộn các ký tự ngẫu nhiên cho đến khi ra đúng từ",
   "chữ giải mã kiểu ma trận",
   "các chữ cái quay vòng trước khi rơi vào đúng chữ thật",
   "hiệu ứng chữ kiểu hacker",
   "những chữ cái nhiễu loạn dần hiện rõ thành tiêu đề"
  ],
  "anatomy": [
   {
    "n": "Glyph churn",
    "sym": "chars (ScrambleTextPlugin)",
    "d": "“Những chữ ngẫu nhiên vẫn còn quay ở cuối trong khi phần còn lại đã ổn định” chính là churn — các ký tự chưa khoá, được lấy từ bộ ký tự dùng để xáo trộn."
   }
  ],
  "prompt": "Hãy dựng hiệu ứng text scramble (decode): mỗi ký tự quay qua các glyph ngẫu nhiên rồi khoá vào ký tự thật theo thứ tự từ trái sang phải (dùng ScrambleTextPlugin của GSAP, hoặc một vòng lặp requestAnimationFrame với hạn chót ổn định riêng cho từng ký tự). Dùng font monospace hoặc glyph có bề rộng bảng (tabular) để chiều rộng không bao giờ rung, đưa chuỗi cuối cùng ra qua aria-label còn span đang xáo trộn đặt aria-hidden, và tôn trọng prefers-reduced-motion bằng cách hiển thị chữ ngay lập tức.",
  "debug": "Hãy gỡ lỗi hiệu ứng text scramble của tôi (GSAP ScrambleTextPlugin / vòng lặp charset bằng rAF). Hãy loại trừ lần lượt: layout rung do độ rộng các glyph không đều (cần monospace hoặc tabular-nums); animation không bao giờ ổn định vì hạn chót của từng ký tự bị đặt lại mỗi lần re-render; trình đọc màn hình đọc ra rác (chữ cuối cùng phải nằm trong aria-label, phần xáo trộn đặt aria-hidden); hiệu ứng chạy lại ở mỗi lần đổi state thay vì chỉ một lần cho mỗi lần mount; người dùng bật reduced-motion lại nhận phần xáo trộn thay vì chữ hiện ngay. Triệu chứng là:",
  "code": [
   {
    "lang": "GSAP",
    "text": "ScrambleTextPlugin",
    "note": "cách triển khai chuẩn, miễn phí từ GSAP 3.13"
   },
   {
    "lang": "JS",
    "text": "requestAnimationFrame + charset swap",
    "note": "bản tự viết tay: mỗi ký tự có hạn chót lộ ra riêng, trước đó là glyph ngẫu nhiên"
   },
   {
    "lang": "CSS",
    "text": "font-variant-numeric: tabular-nums",
    "note": "glyph monospace/tabular giúp dòng không rung trong khi đang xáo trộn"
   },
   {
    "lang": "A11y",
    "text": "aria-label + aria-hidden churn",
    "note": "trình đọc màn hình nhận chữ cuối cùng, không bao giờ nghe thấy phần nhiễu"
   }
  ],
  "see": [
   "web/marquee",
   "web/skeleton-spinner",
   "web/text-animations"
  ]
 },
 "web/three-dots": {
  "lead": "Bốn thứ khác nhau mà đều bị gọi là “ba chấm”, hãy bấm thử từng cái.",
  "sym": [
   "<button>",
   "aria-haspopup=\"menu\""
  ],
  "aka": [
   "kebab menu",
   "meatball menu",
   "hamburger menu",
   "overflow menu",
   "more menu",
   "ellipsis button"
  ],
  "def": "Ba chấm xếp ngang thường được gọi là meatballs còn ba chấm xếp dọc gọi là kebab; cả hai thường mở ra một overflow menu hay menu More chứa các hành động phụ. Ba gạch ngang là nút hamburger và thường mở phần điều hướng, hay nằm trong một drawer. Dấu ba chấm nằm ngay trong một nhãn như “Open…” là dấu câu chứ không phải biểu tượng overflow: nó báo rằng lệnh cần thêm thông tin đầu vào trước khi hoàn tất.",
  "phrases": [
   "cái menu ba chấm",
   "nút các viên thịt viên xếp ngang",
   "ba chấm dọc kiểu xiên kebab",
   "biểu tượng menu ba gạch",
   "ba chấm đằng sau chữ Open",
   "tại sao nút này kết thúc bằng mấy dấu chấm",
   "biểu tượng thêm tuỳ chọn"
  ],
  "anatomy": [
   {
    "n": "Horizontal dots (meatballs / More)",
    "sym": "button[aria-haspopup=\"menu\"]",
    "d": "Ba chấm ngang có biệt danh meatballs và thường mở một overflow menu hay menu More cho mục hoặc khu vực hiện tại."
   },
   {
    "n": "Vertical dots (kebab menu)",
    "sym": "button[aria-haspopup=\"menu\"]",
    "d": "Ba chấm dọc có biệt danh kebab và thường lộ ra cùng loại menu hành động phụ như trên."
   },
   {
    "n": "Three lines (hamburger menu)",
    "sym": "button[aria-controls]",
    "d": "Ba gạch ngang là nút hamburger; khác với các chấm overflow, nó thường mở phần điều hướng chính của site trong một drawer."
   },
   {
    "n": "Command ellipsis",
    "sym": "<button>Open…</button>",
    "d": "Dấu ba chấm trong “Open…” nghĩa là lệnh sẽ hỏi thêm thông tin đầu vào trước khi hoàn tất; các chấm này là một phần của nhãn."
   }
  ],
  "prompt": "Hãy dùng đúng điều khiển ba-dấu cho từng trường hợp: nút ellipsis ngang (meatballs) hoặc ellipsis dọc (kebab) có aria-haspopup=\"menu\" cho menu Overflow/More theo ngữ cảnh; nút hamburger ba gạch có aria-controls cho navigation drawer; hoặc dấu ba chấm bên trong nhãn lệnh như “Open…”, và chỉ khi lệnh đó cần thêm thông tin đầu vào mới hoàn tất được.",
  "debug": "Hãy gỡ lỗi menu ba chấm của tôi (kebab/meatballs, menu button). Hãy loại trừ lần lượt: nút chỉ có biểu tượng mà thiếu aria-label; menu vẫn mở sau khi đã chọn một mục; bấm ra ngoài và phím Escape không đóng được menu; vùng bấm nhỏ hơn hẳn 24px nên trên di động hay bấm trượt. Triệu chứng là:",
  "code": [
   {
    "lang": "HTML",
    "text": "<button>"
   },
   {
    "lang": "ARIA",
    "text": "aria-haspopup=\"menu\""
   },
   {
    "lang": "ARIA",
    "text": "aria-expanded=\"true|false\""
   },
   {
    "lang": "CSS",
    "text": "text-overflow: ellipsis",
    "note": "dấu ba chấm cắt bớt chữ, hoàn toàn không liên quan"
   }
  ],
  "see": [
   "web/truncation",
   "web/popover-dropdown-tooltip",
   "web/dialog-drawer-sheet",
   "macos/context-menu",
   "web/scrim",
   "web/hamburger-menu",
   "web/chat-bubble",
   "web/waffle-menu"
  ]
 },
 "web/time-pickers": {
  "lead": "Hãy cuộn bánh xe: cả ba đều chọn cùng một giờ nhưng theo ba cách khác nhau.",
  "sym": [
   "<input type=\"time\">",
   "UIDatePickerStyle.wheels"
  ],
  "aka": [
   "time picker",
   "picker wheel",
   "slot machine picker",
   "spinning wheel picker",
   "dial time picker",
   "time input"
  ],
  "def": "“Một bánh xe cuộn được” để bạn quay chọn giờ là wheel picker (UIDatePicker kiểu .wheels), cái trống quay kiểu máy đánh bạc trên iOS, nơi dòng được chọn nằm trong một dải xám, như ở màn hình báo thức của ứng dụng Đồng hồ trên iPhone. Trên web thì điều khiển thường gặp là time field (<input type=\"time\">): một ô gõ chia thành các đoạn giờ, phút và AM/PM, trong đó phím mũi tên đổi đoạn đang được focus. Clock dial là một mặt đồng hồ tròn mà bạn kéo kim tới giờ rồi tới phút (TimePicker của Jetpack Compose, bộ chọn di động của MUI). Date picker là lưới lịch: nó chọn ngày chứ không chọn giờ.",
  "phrases": [
   "một component bánh xe cuộn được, thường dùng để chọn ngày",
   "đồng hồ cuộn",
   "bộ chọn dạng mặt đồng hồ đo",
   "vòng quay thời gian",
   "ô chọn thời gian chính xác tới năm tháng ngày giờ phút",
   "các con số quay lên quay xuống với một thanh xám vắt ngang giữa",
   "mặt đồng hồ tròn nơi bạn kéo một đường tới giờ cần chọn"
  ],
  "anatomy": [
   {
    "n": "Selection band",
    "sym": "",
    "d": "“Thanh xám vắt ngang giữa bánh xe” là selection band, còn gọi là selection indicator: dòng nào nằm trong dải đó chính là giá trị được chọn."
   },
   {
    "n": "Focused segment",
    "sym": "<input type=\"time\">",
    "d": "“Con số được làm nổi trong ô thời gian” là focused segment: phím mũi tên chỉ đổi phần đó, tức giờ, phút hoặc AM/PM."
   },
   {
    "n": "Clock hand",
    "sym": "TimePicker (Jetpack Compose) · TimeClock (Material UI)",
    "d": "“Đường có chấm tròn ở đầu trỏ vào con số” là clock hand (kim đồng hồ), tay cầm mà Material di chuyển quanh mặt đồng hồ: kéo nó tới giờ rồi tới phút."
   }
  ],
  "prompt": "Hãy dựng bộ chọn giờ phù hợp với nền tảng: trên web dùng time field (<input type=\"time\">) chia thành các đoạn giờ, phút và AM/PM mà phím mũi tên đổi được; trên iOS dùng wheel picker (UIDatePicker với .wheels; SwiftUI: .datePickerStyle(.wheel)) với dòng được chọn nằm trong dải chọn màu xám; trên Android dùng clock dial (TimePicker của Jetpack Compose). Lưu giờ dưới dạng HH:mm 24 giờ và chỉ hiển thị theo kiểu 12 giờ.",
  "debug": "Hãy gỡ lỗi bộ chọn giờ của tôi (<input type=\"time\">, UIDatePicker .wheels, TimePicker của Jetpack Compose, TimeField / TimeClock của MUI). Hãy loại trừ lần lượt: giá trị bị parse như chữ 12 giờ trong khi <input type=\"time\"> luôn trả về HH:mm 24 giờ; trưa và nửa đêm bị đảo vì 12 bị coi là 0; giờ bị lưu thành một Date đầy đủ rồi bị lệch bởi múi giờ hoặc thay đổi giờ mùa hè; bánh xe tự viết dừng lại giữa hai dòng vì không bao giờ snap; phím mũi tên không hoạt động vì các đoạn tự làm không focus được; kim đồng hồ quay đường vòng dài khi đi qua số 12. Triệu chứng là:",
  "code": [
   {
    "lang": "HTML",
    "text": "<input type=\"time\">",
    "note": "giá trị luôn là HH:mm theo 24 giờ"
   },
   {
    "lang": "UIKit",
    "text": "UIDatePickerStyle.wheels",
    "note": "từ iOS 13.4, kiểu bánh xe quay"
   },
   {
    "lang": "SwiftUI",
    "text": ".datePickerStyle(.wheel)",
    "note": "iOS 13+ và watchOS 10+, không có trên macOS"
   },
   {
    "lang": "Jetpack Compose",
    "text": "TimePicker",
    "note": "là clock dial; TimeInput là phiên bản gõ bằng bàn phím"
   },
   {
    "lang": "Material UI",
    "text": "<TimeClock />",
    "note": "là mặt đồng hồ; <TimeField /> là ô gõ"
   },
   {
    "lang": "AppKit",
    "text": "NSDatePicker.Style.clockAndCalendar",
    "note": "kiểu trên macOS có mặt đồng hồ"
   }
  ],
  "see": [
   "web/date-picker",
   "macos/stepper",
   "web/form-field"
  ]
 },
 "web/timeline": {
  "lead": "Bấm vào chấm rỗng cuối cùng để hoàn tất nó. Các chấm nối với nhau bằng một đường dọc bên cạnh chính là một Timeline.",
  "sym": [
   "<Timeline>",
   "<ol>"
  ],
  "aka": [
   "vertical timeline",
   "activity timeline",
   "activity feed",
   "event history",
   "changelog timeline",
   "history log"
  ],
  "def": "“Những đường dọc nối nhau giống như một bản change log” là Timeline: một danh sách các sự kiện theo đúng thứ tự xảy ra, mỗi sự kiện được đánh dấu bằng một chấm, có đường connector chạy từ chấm này sang chấm kia và một mốc thời gian nằm cạnh mỗi chấm. Theo dõi đơn hàng, activity feed, changelog và lịch sử công ty đều dùng nó. Nó trông giống Steps dọc nhưng mang nghĩa ngược lại: Steps cho thấy các giai đoạn bạn vẫn phải đi qua, còn Timeline ghi lại những gì đã xảy ra, cộng thêm tối đa một sự kiện đang diễn ra dở. Thanh kéo được dưới một video là một thứ khác gọi là scrubber (điểm đánh dấu di chuyển trên đó là playhead), và một lịch trình bày theo từng giờ là calendar hay timetable.",
  "phrases": [
   "timeline",
   "dòng thời gian",
   "những đường dọc nối nhau giống như change log hay một timeline",
   "dòng hoạt động",
   "dòng thời gian của công ty",
   "timeline",
   "lịch trình theo thời gian"
  ],
  "anatomy": [
   {
    "n": "Timeline dot",
    "sym": "<TimelineDot />",
    "d": "“Vòng tròn nhỏ cạnh mỗi sự kiện” là timeline dot (Chakra gọi là Timeline.Indicator; Ant Design dùng icon của item). Chấm đặc nghĩa là việc đã xảy ra."
   },
   {
    "n": "Timeline connector",
    "sym": "<TimelineConnector />",
    "d": "“Đường chạy dọc nối giữa các chấm” là timeline connector: mỗi sự kiện có một đoạn, từ chấm của nó đến chấm kế tiếp, và dừng lại ở chấm cuối cùng."
   },
   {
    "n": "Opposite content",
    "sym": "<TimelineOppositeContent>",
    "d": "“Giờ nằm ở phía bên kia của đường” là opposite content: bất cứ thứ gì nằm đối diện sự kiện qua đường kẻ, hầu như luôn là mốc thời gian của nó."
   },
   {
    "n": "In-progress item",
    "sym": "loading: true",
    "d": "“Chấm cuối cùng vẫn đang xoay hoặc còn rỗng” là in-progress item: sự kiện duy nhất chưa kết thúc (ở Ant Design là cờ loading của item)."
   }
  ],
  "prompt": "Hãy dựng một Timeline dọc (Timeline của Material UI trong @mui/lab, hoặc các items của Timeline trong Ant Design) dưới dạng <ol> các sự kiện theo thứ tự thời gian. Mỗi mục có một TimelineDot được nối sang mục kế bằng một TimelineConnector, tiêu đề và chi tiết sự kiện đặt thành TimelineContent ở một bên, còn thời gian của nó đặt trong phần tử <time datetime> làm TimelineOppositeContent ở bên còn lại. Sự kiện đã xong dùng chấm đặc, sự kiện còn đang diễn ra dùng trạng thái loading của item trong Ant Design, và connector dừng ở chấm cuối chứ không kéo thừa ra phía sau.",
  "debug": "Hãy gỡ lỗi Timeline của tôi (TimelineDot, TimelineConnector, TimelineOppositeContent, các items của Ant Design với mode và loading). Hãy loại trừ lần lượt: connector bị vẽ thành một đường cao duy nhất phía sau cả danh sách nên vượt quá chấm cuối hoặc hụt ngắn khi một mục xuống thành hai dòng (mỗi mục nên sở hữu đoạn nằm dưới chấm của nó); chấm và connector lệch tâm ngang nhau một pixel vì một bên dùng border còn bên kia dùng width; cột opposite-content không có chiều rộng cố định nên các mốc thời gian dài ngắn khác nhau đẩy đường kẻ lệch hàng dọc; vẫn dùng các prop đã bị Ant Design bỏ (dot, label, children, position, pending nay được thay bằng icon, title, content, placement, loading); dùng mode=\"left\" hoặc \"right\" trong khi giá trị hiện hành là \"start\" và \"end\"; các sự kiện dựng bằng div không có ngữ nghĩa danh sách nên trình đọc màn hình không nghe thấy thứ tự hay số lượng; ngày tháng là chữ trần không có <time datetime>; thứ tự mới nhất lên trước làm bằng cách đảo flex trong CSS, vốn đổi thứ tự hiển thị nhưng không đổi thứ tự đọc; thiếu @mui/lab vì Timeline không nằm trong @mui/material. Triệu chứng là:",
  "code": [
   {
    "lang": "Material UI",
    "text": "<Timeline>",
    "note": "nằm trong @mui/lab chứ không thuộc phần core; position=\"alternate\" xếp các sự kiện zích zắc qua hai bên đường"
   },
   {
    "lang": "HTML",
    "text": "<ol>",
    "note": "các sự kiện có thứ tự thật sự, nên danh sách có thứ tự mới là markup trung thực"
   },
   {
    "lang": "Ant Design",
    "text": "<Timeline items={items} />",
    "note": "mode là \"start\", \"alternate\" hoặc \"end\"; mỗi item nhận title, content, icon, color, loading"
   },
   {
    "lang": "Chakra UI",
    "text": "<Timeline.Root>",
    "note": "gồm các phần con Timeline.Title, Timeline.Content, Timeline.Indicator, Timeline.Separator, Timeline.Connector và Timeline.Item"
   },
   {
    "lang": "HTML",
    "text": "<time datetime=\"2026-09-20\">",
    "note": "ngày mà máy đọc được, nằm sau mỗi mốc thời gian dành cho người đọc"
   },
   {
    "lang": "Material UI",
    "text": "<TimelineOppositeContent>",
    "note": "thứ nằm ở phía bên kia của đường, thường là giờ; TimelineDot và TimelineConnector là chấm và đường kẻ"
   }
  ],
  "see": [
   "web/steps",
   "web/progress-indicators",
   "web/card"
  ]
 },
 "web/toast": {
  "lead": "Hoàn tác",
  "sym": [
   "role=\"status\"",
   "Toaster"
  ],
  "aka": [
   "snackbar",
   "status toast",
   "in-app notification"
  ],
  "def": "Toast là một thông điệp trạng thái gọn nhẹ, không modal, hiện ở góc màn hình sau một hành động và tự đóng. Nó xác nhận những kết quả thoáng qua như lưu hay sao chép mà không làm gián đoạn dòng công việc. Khác với notification banner, nó không chiếm một chỗ cố định trong bố cục trang và cũng không đòi người dùng phải xác nhận.",
  "phrases": [
   "dòng thông báo nhỏ bật lên ở góc",
   "lời xác nhận tự biến mất",
   "popup báo đã lưu thành công",
   "thông báo tạm thời sau khi bấm một nút",
   "cảnh báo nhỏ ở cuối màn hình",
   "popup thông báo"
  ],
  "anatomy": [
   {
    "n": "Toast viewport",
    "sym": "Toaster",
    "d": "“Góc nơi mọi thông báo nhỏ chồng lên nhau” là toast viewport."
   },
   {
    "n": "Status message",
    "sym": "role=\"status\"",
    "d": "“Dòng chữ đã lưu thành công tự hiện ra” là status message của toast."
   },
   {
    "n": "Toast action",
    "sym": "ToastAction",
    "d": "“Nút Hoàn tác nằm trong thông báo tạm thời” là toast action."
   }
  ],
  "prompt": "Hãy hiện một Toast (Snackbar) qua một vùng live có role=\"status\" sau khi hành động thành công. Đặt nó ở một góc nhất quán và không chặn trang, chỉ tự đóng sau một khoảng trễ ngắn với những thông điệp không thiết yếu, và tạm dừng bộ đếm đó khi toast đang được rê chuột lên hoặc đang giữ focus bàn phím.",
  "debug": "Hãy gỡ lỗi toast của tôi (vùng aria-live, sonner). Hãy loại trừ lần lượt: không có vùng aria-live nên trình đọc màn hình không bao giờ thông báo; bộ đếm tự đóng không tạm dừng khi hover/focus; các toast xếp chồng lên nhau đè lên thay vì dồn chỗ; animation thoát chạy đua với việc gỡ phần tử nên bị giật đứt; toast hiển thị bên dưới modal do thứ tự z-index. Triệu chứng là:",
  "code": [
   {
    "lang": "ARIA",
    "text": "role=\"status\""
   },
   {
    "lang": "shadcn/ui",
    "text": "Toaster"
   },
   {
    "lang": "Sonner",
    "text": "toast()"
   },
   {
    "lang": "ARIA",
    "text": "aria-live=\"polite\"",
    "note": "thông báo các cập nhật không khẩn cấp"
   }
  ],
  "see": [
   "web/scrim",
   "web/empty-state",
   "web/popover-dropdown-tooltip",
   "web/spring",
   "web/alert-callout-banner",
   "web/chat-bubble"
  ]
 },
 "web/toggle-group": {
  "lead": "Chọn một · căn giữa",
  "sym": [
   "ToggleGroup",
   "role=\"radiogroup\""
  ],
  "aka": [
   "segmented control",
   "button group",
   "view switcher",
   "segmented button"
  ],
  "def": "Toggle group là một hàng nút liên quan gọn gàng, hoạt động như một điều khiển chọn duy nhất. Ở dạng chọn một, nó thường được gọi là segmented control và rất hợp để đổi view hay chế độ ngay lập tức. Khác với tabs, nó thay đổi một cài đặt hoặc cách trình bày chứ không gắn nhãn cho các panel nội dung riêng biệt.",
  "phrases": [
   "hàng nút nối liền nhau, luôn có một nút đang được chọn",
   "bộ chuyển view gọn có nhiều đoạn",
   "nhóm nút hình viên thuốc để chọn danh sách hay lưới",
   "ba lựa chọn nằm trong một điều khiển bo tròn",
   "các nút phân đoạn kiểu iOS nhưng trên web"
  ],
  "anatomy": [
   {
    "n": "Selected toggle",
    "sym": "aria-checked",
    "d": "“Nút trong nhóm vẫn được tô đầy” là selected toggle."
   },
   {
    "n": "Segment divider",
    "sym": "ToggleGroup",
    "d": "“Đường kẻ nhỏ giữa hai lựa chọn trong viên thuốc” là segment divider."
   }
  ],
  "prompt": "Hãy dựng một Toggle Group chọn một và giữ trạng thái, dùng ToggleGroup của Radix. Trình bày các nút nối liền nhau như một segmented control duy nhất, phơi nhóm ra dưới dạng role=\"radiogroup\" với các mục role=\"radio\" và trạng thái aria-checked, và hỗ trợ di chuyển giữa các đoạn bằng phím mũi tên.",
  "debug": "Hãy gỡ lỗi toggle group của tôi (aria-pressed, ToggleGroup của Radix). Hãy loại trừ lần lượt: nhầm lẫn ngữ nghĩa single và multiple — một loại hành xử như radio, loại kia như checkbox; trạng thái pressed không nhìn thấy được vì chỉ đổi màu mà đổi không đủ nhiều; bỏ chọn mục cuối cùng khiến không còn gì hoạt động trong khi luôn phải có một mục bật; phím mũi tên không hoạt động vì roving focus chưa được cài đặt. Triệu chứng là:",
  "code": [
   {
    "lang": "Radix",
    "text": "ToggleGroup"
   },
   {
    "lang": "ARIA",
    "text": "role=\"radiogroup\""
   },
   {
    "lang": "ARIA",
    "text": "role=\"radio\""
   },
   {
    "lang": "ARIA",
    "text": "aria-checked"
   },
   {
    "lang": "shadcn/ui",
    "text": "ToggleGroup"
   }
  ],
  "see": [
   "web/tabs",
   "web/switch-checkbox-radio",
   "macos/segmented-control",
   "web/badge-chip-pill"
  ]
 },
 "web/truncation": {
  "lead": "Hãy chuyển qua lại Narrow / Wide; dấu … ở chỗ bị cắt là một ký tự ellipsis duy nhất, không phải ba dấu chấm.",
  "sym": [
   "text-overflow: ellipsis",
   "-webkit-line-clamp"
  ],
  "aka": [
   "ellipsis",
   "text overflow",
   "line clamp",
   "clamped text",
   "truncated text"
  ],
  "def": "“Đoạn chữ bị cắt cụt bằng ba chấm” là truncation, và các chấm đó là một ellipsis (…, một ký tự duy nhất chứ không phải ba dấu chấm câu). Cắt ở cuối dòng là text-overflow: ellipsis; cắt sau N dòng là line clamp; còn dấu chấm nằm giữa một tên file dài là middle truncation — trên macOS là chức năng gốc, trên web thì phải dùng JS. Đừng nhầm nó với nút menu overflow ⋯: cùng các chấm nhưng nhiệm vụ hoàn toàn khác.",
  "phrases": [
   "chữ bị cắt bằng ba chấm",
   "chỉ hiện hai dòng rồi chấm chấm chấm",
   "tên file dài có dấu chấm ở giữa",
   "cắt tiêu đề sau một dòng thay vì xuống dòng",
   "chữ mờ dần ở mép thay vì có dấu chấm",
   "tiêu đề dài quá so với cái khung"
  ],
  "anatomy": [
   {
    "n": "End ellipsis",
    "sym": "text-overflow: ellipsis",
    "d": "“Chấm chấm chấm ở cuối dòng” — chỉ phát huy khi đi cùng overflow: hidden và white-space: nowrap."
   },
   {
    "n": "Line clamp",
    "sym": "-webkit-line-clamp",
    "d": "“Hiện hai dòng rồi cắt đi” là line clamp — dấu ellipsis rơi vào cuối dòng cuối cùng được phép."
   },
   {
    "n": "Middle truncation",
    "sym": "NSLineBreakMode.byTruncatingMiddle",
    "d": "“Các chấm ở giữa một tên file dài” giữ cho cả hai đầu vẫn đọc được — trên macOS là chức năng gốc (.byTruncatingMiddle); trên web phải dùng JS."
   },
   {
    "n": "Fade-out (soft truncation)",
    "sym": "mask-image",
    "d": "“Chữ mờ dần ở mép thay vì có chấm” — một kiểu cắt mềm làm bằng mặt nạ trong suốt, hay gặp ở card và phần xem trước code."
   }
  ],
  "prompt": "Hãy cắt chữ bằng CSS. Một dòng: đặt overflow: hidden, kèm white-space: nowrap, rồi thêm text-overflow: ellipsis. Nhiều dòng: đặt display: -webkit-box cùng -webkit-box-orient: vertical, rồi -webkit-line-clamp: 2 và overflow: hidden (line-clamp không tiền tố chưa an toàn trên mọi trình duyệt). Middle truncation giữ lại phần đuôi mở rộng của file thì trên web cần JS — còn trên macOS là lineBreakMode = .byTruncatingMiddle. Nếu muốn chữ mờ dần thay cho dấu chấm, hãy dùng mask-image với một linear-gradient theo hướng to right, từ black đến mốc 70% rồi chuyển sang transparent.",
  "debug": "Hãy gỡ lỗi việc cắt chữ của tôi (text-overflow ellipsis, line-clamp). Hãy loại trừ lần lượt: ellipsis cần đủ cả ba thứ là overflow hidden, white-space nowrap và một ràng buộc chiều rộng thật sự — trong hàng flex hãy thêm min-width:0 cho phần tử con đang co, đây là lỗi kinh điển; nhiều dòng cần -webkit-line-clamp đi kèm -webkit-box; middle truncation (tên file) cần JS, CSS không làm được; không xem được chữ đầy đủ vì không có title/tooltip nào hé lộ nó. Triệu chứng là:",
  "code": [
   {
    "lang": "CSS",
    "text": "text-overflow: ellipsis"
   },
   {
    "lang": "CSS",
    "text": "-webkit-line-clamp"
   },
   {
    "lang": "CSS",
    "text": "white-space: nowrap",
    "note": "bắt buộc phải có để ellipsis một dòng hoạt động"
   },
   {
    "lang": "AppKit",
    "text": "NSLineBreakMode.byTruncatingMiddle",
    "note": "middle truncation là chức năng gốc trên macOS"
   },
   {
    "lang": "CSS",
    "text": "mask-image",
    "note": "phương án thay thế bằng hiệu ứng mờ dần"
   }
  ],
  "see": [
   "web/three-dots",
   "web/breadcrumbs",
   "web/marquee",
   "web/pagination"
  ]
 },
 "web/waffle-menu": {
  "lead": "Hãy bấm vào chín chấm cạnh avatar: nút đó là waffle, và lưới ứng dụng mà nó mở ra là panel của nó.",
  "sym": [
   "<button aria-expanded aria-controls>",
   "<div popover>"
  ],
  "aka": [
   "waffle icon",
   "waffle button",
   "app switcher",
   "grid icon",
   "Google apps menu"
  ],
  "def": "“Lưới chín chấm ở góc trên” là waffle menu, hay app launcher: một nút biểu tượng mở ra một panel gồm các ô ứng dụng, mỗi ô là một icon nằm trên một cái tên ngắn. Google đặt nó cạnh ảnh đại diện của bạn, Microsoft 365 vẽ chín ô vuông ở góc trên bên trái, còn biểu tượng hiện tại của Atlassian là bốn ô vuông. Trong khi panel đang mở, nút giữ một vòng tròn nhạt phía sau, và bấm ra ngoài hoặc nhấn Escape sẽ đóng nó. Ba chấm mở các hành động cho một mục, ba gạch của hamburger mở điều hướng trang; còn bento grid là một kiểu bố cục trang chứ không phải menu.",
  "phrases": [
   "lưới chín chấm ở góc trên mở ra tất cả các ứng dụng",
   "có lẽ là 9 ô vuông, bấm vào thường mở ra một menu",
   "menu dạng ô hiện ra khi bấm vào biểu tượng điều hướng toàn cục",
   "biểu tượng 4 ô vuông mở ra các ứng dụng khác của tôi",
   "lưới biểu tượng ứng dụng nhiều màu thả xuống từ phần header",
   "nút chấm cạnh ảnh đại diện của tôi trong gmail"
  ],
  "anatomy": [
   {
    "n": "Waffle button (nine dots)",
    "sym": "<button aria-expanded>",
    "d": "“Lưới chín chấm” là waffle button, nó giữ một vòng tròn nhạt phía sau trong lúc panel của nó đang mở."
   },
   {
    "n": "App panel (launcher)",
    "sym": "<div popover>",
    "d": "“Ma trận lưới chứa các ứng dụng” là app panel: các ô bằng nhau, mỗi ô là một icon nằm trên một nhãn, ba ô mỗi hàng, neo ngay dưới nút."
   }
  ],
  "prompt": "Hãy thêm một waffle menu, tức app launcher: một <button aria-expanded aria-controls> tròn ở góc trên bên phải header, vẽ lưới 3x3 chấm (Material Symbols apps), bấm vào mở ra một panel gồm các ô ứng dụng neo ngay bên dưới (HTML popover), mỗi ô là một icon nằm trên một nhãn ngắn, ba ô mỗi hàng. Đóng nó khi bấm ra ngoài hoặc nhấn Escape và trả focus về nút. Tuyệt đối không dựng nó như role=\"menu\", một hamburger hay một menu ba chấm.",
  "debug": "Hãy gỡ lỗi waffle menu của tôi (một <button aria-expanded> chín chấm mở ra panel ứng dụng). Hãy loại trừ lần lượt: panel bị cắt bởi header có overflow: hidden; panel trượt xuống dưới một header sticky vì z-index của nó; aria-expanded không bao giờ lật giá trị; focus không trả về nút sau khi nhấn Escape; panel tràn khỏi mép phải trên điện thoại hẹp; các chấm vẽ với kích thước pixel lẻ nên bị nhòe; màu icon gán cứng nên biến mất ở dark mode; vùng bấm nhỏ hơn 40px. Triệu chứng là:",
  "code": [
   {
    "lang": "HTML",
    "text": "<button aria-expanded aria-controls>",
    "note": "nút chín chấm; là một disclosure chứ không phải menu"
   },
   {
    "lang": "HTML",
    "text": "<div popover>",
    "note": "panel; bấm ra ngoài hoặc nhấn Esc là đóng"
   },
   {
    "lang": "Material Symbols",
    "text": "apps",
    "note": "chín chấm tròn"
   },
   {
    "lang": "Fluent UI",
    "text": "WaffleIcon",
    "note": "chín ô vuông của Microsoft"
   },
   {
    "lang": "Atlassian",
    "text": "<AppSwitcher>",
    "note": "truyền vào renderAppSwitcher trong top nav"
   }
  ],
  "see": [
   "web/three-dots",
   "web/hamburger-menu",
   "web/popover-dropdown-tooltip",
   "web/header-navbar",
   "web/bento-grid"
  ]
 }
};
