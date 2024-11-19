export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-6 dark:border-border md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          普通は1番下に企業情報、運営規約、プライバシーポリシー等が入るけど、何か入れる？
        </p>
      </div>
    </footer>
  )
}