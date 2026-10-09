#!/usr/bin/env python3
"""build-ui-libs — danh mục repo thư viện UI miễn phí, số liệu lấy SỐNG từ GitHub GraphQL (cần `gh` đã đăng nhập).

Danh sách repo + phân loại gõ tay ở LIBS; sao, mô tả, license, ngày push đọc từ API lúc build — không gõ tay.
Repo đổi tên/xoá thì API trả null → in cảnh báo và bỏ qua, không bịa.

    python3 tools/build-ui-libs.py    # ghi ui-libraries/libs.json + ui-libraries/index.html
"""
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "ui-libraries"

# (repo, framework, loại). Loại: full = bộ đầy đủ có style · copy = copy-paste kiểu shadcn · headless = primitive không style
# · motion = hiệu ứng/animated · css = CSS/Tailwind thuần · ds = design system của công ty · wc = Web Components · mobile
LIBS = [
    # React
    ("mui/material-ui", "React", "full"), ("ant-design/ant-design", "React", "full"), ("chakra-ui/chakra-ui", "React", "full"),
    ("mantinedev/mantine", "React", "full"), ("heroui-inc/heroui", "React", "full"), ("primefaces/primereact", "React", "full"),
    ("rsuite/rsuite", "React", "full"), ("react-bootstrap/react-bootstrap", "React", "full"), ("grommet/grommet", "React", "full"),
    ("geist-org/geist-ui", "React", "full"), ("radix-ui/themes", "React", "full"), ("tremorlabs/tremor", "React", "full"),
    ("arco-design/arco-design", "React", "full"), ("DouyinFE/semi-design", "React", "full"), ("Tencent/tdesign-react", "React", "full"),
    ("shadcn-ui/ui", "React", "copy"), ("keenthemes/reui", "React", "copy"), ("origin-space/originui", "React", "copy"),
    ("haydenbleasel/kibo", "React", "copy"), ("intentui/intentui", "React", "copy"),
    ("cosscom/coss", "React", "copy"), ("cschroeter/park-ui", "Đa framework", "copy"),
    ("magicuidesign/magicui", "React", "motion"), ("DavidHDev/react-bits", "React", "motion"), ("imskyleen/animate-ui", "React", "motion"),
    ("ibelick/motion-primitives", "React", "motion"), ("nolly-studio/cult-ui", "React", "motion"),
    ("mui/base-ui", "React", "headless"), ("radix-ui/primitives", "React", "headless"), ("tailwindlabs/headlessui", "React", "headless"),
    ("ariakit/ariakit", "React", "headless"), ("adobe/react-spectrum", "React", "headless"), ("chakra-ui/ark", "Đa framework", "headless"),
    ("chakra-ui/zag", "Đa framework", "headless"), ("emilkowalski/vaul", "React", "headless"), ("emilkowalski/sonner", "React", "headless"),
    ("pacocoursey/cmdk", "React", "headless"),
    ("microsoft/fluentui", "React", "ds"), ("palantir/blueprint", "React", "ds"), ("primer/react", "React", "ds"),
    ("Shopify/polaris", "React", "ds"), ("elastic/eui", "React", "ds"), ("patternfly/patternfly-react", "React", "ds"),
    ("jpmorganchase/salt-ds", "React", "ds"), ("pinterest/gestalt", "React", "ds"), ("uber/baseweb", "React", "ds"),
    ("twilio-labs/paste", "React", "ds"), ("kiwicom/orbit", "React", "ds"), ("zendeskgarden/react-components", "React", "ds"),
    ("seek-oss/braid-design-system", "React", "ds"), ("segmentio/evergreen", "React", "ds"),
    # Vue
    ("vuetifyjs/vuetify", "Vue", "full"), ("element-plus/element-plus", "Vue", "full"), ("quasarframework/quasar", "Vue", "full"),
    ("primefaces/primevue", "Vue", "full"), ("tusen-ai/naive-ui", "Vue", "full"), ("vueComponent/ant-design-vue", "Vue", "full"),
    ("arco-design/arco-design-vue", "Vue", "full"), ("Tencent/tdesign-vue-next", "Vue", "full"), ("nuxt/ui", "Vue", "full"),
    ("buefy/buefy", "Vue", "full"), ("bootstrap-vue-next/bootstrap-vue-next", "Vue", "full"),
    ("unovue/shadcn-vue", "Vue", "copy"), ("unovue/inspira-ui", "Vue", "motion"), ("unovue/reka-ui", "Vue", "headless"),
    ("youzan/vant", "Vue", "mobile"), ("varletjs/varlet", "Vue", "mobile"),
    # Svelte
    ("huntabyte/shadcn-svelte", "Svelte", "copy"), ("huntabyte/bits-ui", "Svelte", "headless"), ("melt-ui/melt-ui", "Svelte", "headless"),
    ("skeletonlabs/skeleton", "Svelte", "full"), ("themesberg/flowbite-svelte", "Svelte", "full"),
    ("carbon-design-system/carbon-components-svelte", "Svelte", "ds"), ("hperrin/svelte-material-ui", "Svelte", "full"),
    # Angular
    ("angular/components", "Angular", "full"), ("primefaces/primeng", "Angular", "full"), ("NG-ZORRO/ng-zorro-antd", "Angular", "full"),
    ("Taiga-Family/taiga-ui", "Angular", "full"), ("ng-bootstrap/ng-bootstrap", "Angular", "full"),
    ("valor-software/ngx-bootstrap", "Angular", "full"), ("akveo/nebular", "Angular", "full"), ("spartan-ng/spartan", "Angular", "copy"),
    ("vmware-clarity/ng-clarity", "Angular", "ds"),
    # Solid / Qwik
    ("kobaltedev/kobalte", "Solid", "headless"), ("stefan-karger/solid-ui", "Solid", "copy"), ("qwikifiers/qwik-ui", "Qwik", "headless"),
    # React Native / mobile
    ("tamagui/tamagui", "React Native", "full"), ("gluestack/gluestack-ui", "React Native", "full"),
    ("callstack/react-native-paper", "React Native", "full"), ("react-native-elements/react-native-elements", "React Native", "full"),
    ("GeekyAnts/NativeBase", "React Native", "full"), ("ant-design/ant-design-mobile", "React", "mobile"),
    ("ionic-team/ionic-framework", "Web Components", "mobile"), ("framework7io/framework7", "Đa framework", "mobile"),
    ("OnsenUI/OnsenUI", "Đa framework", "mobile"),
    # Web Components / không phụ thuộc framework
    ("shoelace-style/webawesome", "Web Components", "wc"), ("shoelace-style/shoelace", "Web Components", "wc"),
    ("material-components/material-web", "Web Components", "wc"), ("microsoft/fast", "Web Components", "wc"),
    ("SAP/ui5-webcomponents", "Web Components", "wc"), ("vaadin/web-components", "Web Components", "wc"),
    ("adobe/spectrum-web-components", "Web Components", "wc"), ("carbon-design-system/carbon", "Đa framework", "ds"),
    ("alphagov/govuk-frontend", "CSS", "ds"), ("uswds/uswds", "CSS", "ds"), ("primer/css", "CSS", "ds"),
    ("shader-effects-inc/shaders", "Đa framework", "motion"), ("uiverse-io/galaxy", "CSS", "motion"),
    # CSS / Tailwind
    ("twbs/bootstrap", "CSS", "css"), ("saadeghi/daisyui", "CSS", "css"), ("themesberg/flowbite", "CSS", "css"),
    ("htmlstreamofficial/preline", "CSS", "css"), ("jgthms/bulma", "CSS", "css"), ("foundation/foundation-sites", "CSS", "css"),
    ("fomantic/Fomantic-UI", "CSS", "css"), ("Semantic-Org/Semantic-UI", "CSS", "css"), ("uikit/uikit", "CSS", "css"),
    ("materializecss/materialize", "CSS", "css"), ("picocss/pico", "CSS", "css"), ("beercss/beercss", "CSS", "css"),
    ("franken-ui/ui", "CSS", "css"), ("hunvreus/basecoat", "CSS", "css"), ("halfmoonui/halfmoon", "CSS", "css"),
    ("markmead/hyperui", "CSS", "css"), ("merakiui/merakiui", "CSS", "css"), ("TailGrids/tailgrids", "CSS", "css"),
    ("kevquirk/simple.css", "CSS", "css"), ("kognise/water.css", "CSS", "css"), ("oxalorg/sakura", "CSS", "css"),
    ("argyleink/open-props", "CSS", "css"), ("jdan/98.css", "CSS", "css"), ("botoxparty/XP.css", "CSS", "css"),
    ("nostalgic-css/NES.css", "CSS", "css"),
]

Q = """repository(owner:%s,name:%s){nameWithOwner description stargazerCount forkCount pushedAt createdAt isArchived
  homepageUrl url licenseInfo{spdxId} primaryLanguage{name}}"""


def fetch():
    out = {}
    for i in range(0, len(LIBS), 40):
        chunk = LIBS[i:i + 40]
        body = " ".join(f"r{i + j}:" + Q % (json.dumps(r.split("/")[0]), json.dumps(r.split("/")[1])) for j, (r, _, _) in enumerate(chunk))
        res = subprocess.run(["gh", "api", "graphql", "-f", "query={" + body + "}"], capture_output=True, text=True)
        data = json.loads(res.stdout or "{}").get("data") or {}
        for j, (r, fw, kind) in enumerate(chunk):
            d = data.get(f"r{i + j}")
            if not d:
                print(f"bỏ {r}: API không trả repo (đổi tên/xoá?)", file=sys.stderr)
                continue
            lic = (d["licenseInfo"] or {}).get("spdxId") or "?"
            out[d["nameWithOwner"]] = {
                "repo": d["nameWithOwner"], "url": d["url"], "home": d["homepageUrl"] or "", "desc": (d["description"] or "").strip(),
                "stars": d["stargazerCount"], "forks": d["forkCount"], "pushed": d["pushedAt"][:10], "created": d["createdAt"][:10],
                "archived": d["isArchived"], "license": lic, "lang": (d["primaryLanguage"] or {}).get("name", ""), "fw": fw, "kind": kind}
    return sorted(out.values(), key=lambda x: -x["stars"])


def main():
    libs = fetch()
    if len(libs) < len(LIBS) * 0.8:
        sys.exit(f"chỉ lấy được {len(libs)}/{len(LIBS)} repo — gh chưa đăng nhập hoặc API lỗi, không ghi đè")
    OUT.mkdir(exist_ok=True)
    meta = {"built": datetime.now(timezone.utc).strftime("%Y-%m-%d"), "libs": libs}
    (OUT / "libs.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding="utf-8")
    tpl = (ROOT / "tools" / "ui-libs.tpl.html").read_text(encoding="utf-8")
    data = json.dumps(meta, ensure_ascii=False).replace("</", "<\\/")
    (OUT / "index.html").write_text(tpl.replace("/*DATA*/null", data).replace("{{N}}", str(len(libs))), encoding="utf-8")
    print(f"ui-libraries: {len(libs)} repo · {sum(x['stars'] for x in libs):,} sao")


if __name__ == "__main__":
    main()
