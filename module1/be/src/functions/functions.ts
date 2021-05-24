function getTaskForToday(challengeId: string): TaskForToday {
    return {} as TaskForToday
}

function getActualAchievements(challengeId: string): ActualAchievement[] {
    return [] as ActualAchievement[]
}
function getTaskArchive(challengeId: string): ArchiveItem[] {
    return [] as ArchiveItem[]
}

function startNewChallenge(
    tasksList: Task[],
    challengesList: string[],
    challengeDuration = 30,
    achievementsNumber = challengeDuration/6
): Challenge {
    return {} as Challenge
}

function calculateAchievementsStatus(achievementsList: ActualAchievement[]): Status {
    return {} as Status
}
