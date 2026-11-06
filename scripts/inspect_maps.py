import urllib.request

u1 = "https://www.google.com/maps/search/?api=1&query=Traduz+Tudo&query_place_id=ChIJF8x2AyL5zpQRGPTDBDC44uY"
u2 = "https://www.google.com/maps/place/Traduz+Tudo/@-23.4895648,-46.7010797,17z/data=!4m6!3m5!1s0x94cef9220376cc17:0xe6e2b83004c3f418!8m2!3d-23.4895648!4d-46.7010797"

for name, u in [("Official API URL", u1), ("Direct Place URL", u2)]:
    req = urllib.request.Request(u, headers={
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    })
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"{name}: status={resp.status}, final_url={resp.geturl()[:80]}")
    except Exception as e:
        print(f"{name}: error={e}")
