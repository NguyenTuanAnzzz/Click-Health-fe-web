import os

dir_path = r"D:\abc\Click-Health-fe-web\src"

color_map = {
    "#2ecea0": "#7AB5E9",
    "#26b38a": "#5CA5E4",
    "#6dddbd": "#BEDBF4",
    "#244d54": "#1F75C1",
    "#2ECEA0": "#7AB5E9",
    "#26B38A": "#5CA5E4",
    "#6DDDBD": "#BEDBF4",
    "#244D54": "#1F75C1",
    "46 206 160": "122 181 233",
    "109 221 189": "190 219 244",
    "36 77 84": "31 117 193",
}

for root, _, files in os.walk(dir_path):
    for file in files:
        if file.endswith(('.js', '.jsx', '.ts', '.tsx', '.css')):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                for old_color, new_color in color_map.items():
                    content = content.replace(old_color, new_color)
                
                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
            except Exception as e:
                print(f"Error processing {filepath}: {e}")
print("Color replacement done!")
