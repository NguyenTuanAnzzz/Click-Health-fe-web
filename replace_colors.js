const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'src');

const colorMap = {
    "#2ecea0": "#7AB5E9",
    "#26b38a": "#5CA5E4",
    "#6dddbd": "#BEDBF4",
    "#244d54": "#1F75C1",
    "46 206 160": "122 181 233",
    "109 221 189": "190 219 244",
    "36 77 84": "31 117 193"
};

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (/\.(js|jsx|ts|tsx|css)$/i.test(fullPath)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const originalContent = content;
            
            for (const [oldColor, newColor] of Object.entries(colorMap)) {
                const regex = new RegExp(oldColor, 'gi');
                content = content.replace(regex, newColor);
            }
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

processDirectory(dirPath);
console.log("Color replacement done!");
