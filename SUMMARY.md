# Summary
The project is well-implemented, showcasing clean and maintainable code. It follows good development practices, with a clear separation of concerns, making each component focused on a specific task.<br />
The use of TypeScript adds type safety, improving the reliability and readability of the code.<br />
Furthermore, the organization of the code reflects a solid architecture, adhering to SOLID principles and including modular components that facilitate maintenance.


## Implementations

### Features
- **Drawing Tool:** Users can draw freehand on the canvas using the mouse. The drawing line's color and size can be adjusted using color and range inputs.
- **Text Input:** A feature allowing users to add text onto the canvas. When in text mode, clicking on the canvas opens a text input box, and pressing "Enter" places the text on the canvas.
- **Eraser Tool:** Users can switch to an eraser mode to erase parts of the drawing by drawing over existing content.

### Libraries
- **TypeScript:** The project was built using TypeScript for type safety, ensuring more maintainable and reliable code.
- **Unit Tests:** Tests were written using Jest and React Testing Library to validate user interactions, including drawing, erasing, changing colors, adjusting line width, and handling text input.
- **Hugeicons:** This library was used because it provides a collection of beautiful and user-friendly icons, suitable for student users. These icons help users quickly understand what each tool does without relying on text labels.

## Next steps
- **New features:** Development of new features, such as Shape Drawing Tools, Save/Load Drawings, Keyboard Shortcuts and Mobile Responsiveness.
- **API Integration:** 
Implementing API integration would allow users to save and load their drawings from a server, enabling persistent storage, collaboration features, and access to shared drawing templates. It would also enable syncing across devices and user authentication, enhancing the functionality and scalability of the project.