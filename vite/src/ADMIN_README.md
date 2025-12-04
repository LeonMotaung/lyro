# Admin Content Management Dashboard

A professional admin dashboard for managing Lyro Maths content with live LaTeX editing capabilities.

## Features

### 🎯 Core Functionality

- **Paper Selector**: Toggle between Paper 1 (Algebra) and Paper 2 (Geometry)
- **Topic Categorization**: Dropdown menus for precise topic assignment
- **Live LaTeX Editor**: Split-view with real-time preview
- **Answer Options**: Multiple choice question builder
- **Question Publishing**: One-click publish to database

### 📝 LaTeX Editor

The LaTeX editor provides:
- **Input Panel**: Monospace code editor for LaTeX input
- **Preview Panel**: Real-time rendered mathematical equations
- **Quick Tips**: Common LaTeX commands for reference
- **Syntax Highlighting**: Clear, readable code display

### 🎨 Design Features

- **Dark Theme**: Professional dark indigo background (#2C3E50)
- **Glassmorphism**: Modern frosted glass effects
- **Gradient Accents**: Teal to orange gradient buttons
- **Responsive Layout**: Works on desktop and tablet
- **Smooth Animations**: Polished transitions and hover effects

## Usage

### Accessing the Dashboard

Navigate to `/admin` in your application:

```
http://localhost:5173/admin
```

### Creating a Question

1. **Select Paper**: Choose Paper 1 or Paper 2
2. **Select Topic**: Pick the relevant topic from dropdown
3. **Write LaTeX**: Enter your mathematical expression
4. **Preview**: Check the live preview on the right
5. **Add Options**: Enter 4 answer choices (A, B, C, D)
6. **Mark Correct**: Select the correct answer
7. **Publish**: Click "Publish Question" button

### LaTeX Examples

**Integral:**
```latex
\int_{a}^{b} x^2 \, dx
```

**Fraction:**
```latex
\frac{a}{b}
```

**Square Root:**
```latex
\sqrt{x^2 + y^2}
```

**Summation:**
```latex
\sum_{i=1}^{n} i^2
```

**Matrix:**
```latex
\begin{pmatrix} a & b \\ c & d \end{pmatrix}
```

## Technical Implementation

### Dependencies

- **react-latex-next**: LaTeX rendering
- **katex**: Math typesetting engine
- **react-router-dom**: Routing

### Component Structure

```
AdminDashboard/
├── AdminDashboard.tsx    # Main component
├── AdminDashboard.css    # Styling
└── README.md            # Documentation
```

### State Management

```typescript
const [selectedPaper, setSelectedPaper] = useState<1 | 2>(1);
const [selectedTopic, setSelectedTopic] = useState('');
const [latexInput, setLatexInput] = useState('');
const [options, setOptions] = useState(['', '', '', '']);
const [correctAnswer, setCorrectAnswer] = useState(0);
```

### Data Structure

```typescript
interface Question {
    latex: string;
    topic: string;
    paper: 1 | 2;
    options: string[];
    correctAnswer: number;
}
```

## Topics Available

### Paper 1 (Algebra & Calculus)
- Algebra
- Functions
- Sequences and Series
- Calculus
- Probability
- Statistics

### Paper 2 (Geometry & Trigonometry)
- Euclidean Geometry
- Analytical Geometry
- Trigonometry
- Statistics
- Transformations

## Customization

### Adding New Topics

Edit the topic arrays in `AdminDashboard.tsx`:

```typescript
const paper1Topics = [
    'Algebra',
    'Your New Topic',
    // ...
];
```

### Changing Colors

Update CSS variables in `AdminDashboard.css`:

```css
/* Primary color */
--teal: #00d4aa;

/* Secondary color */
--orange: #ff6b35;

/* Background */
--bg-dark: #2C3E50;
```

### Backend Integration

Replace the `handlePublish` function with your API call:

```typescript
const handlePublish = async () => {
    const question: Question = {
        latex: latexInput,
        topic: selectedTopic,
        paper: selectedPaper,
        options,
        correctAnswer
    };

    try {
        const response = await fetch('/api/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(question)
        });
        
        if (response.ok) {
            alert('Question published successfully!');
            // Reset form
        }
    } catch (error) {
        console.error('Error publishing question:', error);
    }
};
```

## Keyboard Shortcuts

- `Tab`: Indent in LaTeX editor
- `Ctrl/Cmd + Enter`: Publish question (coming soon)

## Responsive Design

The dashboard is optimized for:
- **Desktop**: Full sidebar with labels
- **Tablet**: Compact sidebar with icons only
- **Mobile**: Stacked layout (coming soon)

## Security Considerations

For production:

1. **Authentication**: Add admin login requirement
2. **Authorization**: Verify admin permissions
3. **Input Validation**: Sanitize LaTeX input
4. **Rate Limiting**: Prevent spam submissions
5. **CSRF Protection**: Add CSRF tokens

## Future Enhancements

- [ ] Drag-and-drop image upload
- [ ] Question preview before publish
- [ ] Edit existing questions
- [ ] Bulk import from CSV
- [ ] Question analytics
- [ ] Version history
- [ ] Collaborative editing
- [ ] LaTeX template library

## Troubleshooting

### LaTeX Not Rendering

**Issue**: Preview shows raw LaTeX code

**Solution**: 
- Ensure `katex.min.css` is imported
- Check that `react-latex-next` is installed
- Verify LaTeX syntax is correct

### Styling Issues

**Issue**: Dashboard looks broken

**Solution**:
- Import `AdminDashboard.css` in component
- Check for CSS conflicts with global styles
- Clear browser cache

### Route Not Working

**Issue**: `/admin` shows 404

**Solution**:
- Verify route is added in `App.tsx`
- Check import path for `AdminDashboard`
- Restart dev server

## Support

For issues or questions:
- Check the LaTeX syntax guide
- Review the component code
- Test in browser console

---

**Built with ❤️ for Lyro Maths**
