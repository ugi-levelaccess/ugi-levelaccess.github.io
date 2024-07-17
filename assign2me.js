function processIssues() {
    const accountId = document.querySelector('meta[name="ajs-atlassian-account-id"]').content;
    const issueKeys = Array.from(document.querySelector(`div[data-testid="issue.issue-view.views.common.child-issues-panel.issues-container"`).querySelectorAll(`a[data-testid="issue.issue-view.views.common.issue-line-card.issue-line-card-view.key"]`)).map(link => link.textContent.trim())
    if (!issueKeys.length && confirm(`Do you want to assign these to yourself?\n\n${issueKeys.join('\n')}`)) {
        issueKeys.forEach(issueKey => {
            fetch(`https://levelaccess-services.atlassian.net/rest/api/3/issue/${issueKey}/assignee`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ accountId })
            })
        })
        window.location.reload();
    }
}