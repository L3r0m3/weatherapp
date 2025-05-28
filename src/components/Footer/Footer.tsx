export const Footer = () => {
  return (
    <div className="text-center mt-8">
      <p className="text-white/60 text-sm">
        Letzte Aktualisierung: {new Date().toLocaleTimeString("de-DE")}
      </p>
    </div>
  );
};
