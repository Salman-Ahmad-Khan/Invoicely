export function Footer() {
  return (
    <footer className="bg-black text-muted-foreground py-4 w-full">
      <div className="px-4 flex flex-row justify-between items-center text-center">
        <p>&copy; {new Date().getFullYear()} Invoicely.</p>
        <a
          href="https://www.linkedin.com/in/celman"
          className="text-muted-foreground hover:text-white mx-2"
        >
          Contact Us
        </a>
      </div>
    </footer>
  );
}
