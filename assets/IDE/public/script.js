const editor = document.getElementById('code-editor');
const feedback = document.getElementById('feedback');
const runButton = document.getElementById('run-btn');
const terminal = document.getElementById('terminal');
const renderOutput = document.getElementById('render-output');

// Basic regex patterns for detecting potential XSS vulnerabilities
const vulnerabilityPatterns = {
    'eval': /eval\(/g,
    'document.cookie': /document\.cookie/g,
    'window.location': /window\.location/g,
    'on*=': /on\w+=/g,
    '<script>': /<script.*?>/g,
};

// Check for vulnerabilities in the code
function checkForVulnerabilities(code) {
    const lines = code.split('\n');
    const vulnerabilities = [];

    lines.forEach((line, index) => {
        for (const [key, pattern] of Object.entries(vulnerabilityPatterns)) {
            if (pattern.test(line)) {
                vulnerabilities.push(`Line ${index + 1}: contains '${key}' which is vulnerable to XSS attacks.`);
            }
        }
    });

    return vulnerabilities;
}

// Run button functionality
runButton.addEventListener('click', () => {
    const code = editor.value;

    // Clear terminal and feedback
    terminal.innerHTML = '';
    feedback.innerHTML = '';

    // Check for vulnerabilities
    const vulnerabilities = checkForVulnerabilities(code);
    if (vulnerabilities.length > 0) {
        feedback.innerHTML = vulnerabilities.join('<br/>');
    }

    // Display output in the terminal
    try {
        const output = new Function(code)();
        terminal.innerHTML += `Output: ${output ? output : 'No output'}`;
    } catch (e) {
        terminal.innerHTML += `Error: ${e.message}`;
    }

    // Render HTML, CSS, and JS in the iframe
    renderOutput.srcdoc = code;
});
