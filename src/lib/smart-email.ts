/** Desktop → Gmail compose; mobile → native mailto. Matches the original behaviour. */
export function openSmartEmail(email: string): void {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
  if (isMobile) {
    window.location.href = `mailto:${email}`;
  } else {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, "_blank", "noopener");
  }
}
