/**
 * Identity tag for SQL template literals.
 *
 * Doesn't transform the query at runtime — it exists purely so
 * `prettier-plugin-embed` can recognize the tagged template as SQL and
 * format it with `prettier-plugin-sql`. Keep bind values out of the
 * template (use `?` placeholders passed separately to sqlite) so nothing
 * here ever concatenates untrusted input into the query text.
 */
export function sql(strings: TemplateStringsArray): string {
  return strings.join('');
}
